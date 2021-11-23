/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { StackFrame } from '../stackframe'

// TODO: update to latest version of source-map
// uses wasm??
// eslint-disable-next-line @typescript-eslint/no-var-requires
const SourceMap = require('source-map')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SourceMapConsumer = any

/**
 * Make a X-Domain request to url and callback.
 *
 * @param {String} url
 * @returns {Promise} with response text if fulfilled
 */
async function _xdr(url: string) {
  return new Promise<string>(function (resolve, reject) {
    const req = new XMLHttpRequest()
    req.open('get', url)
    req.onerror = reject
    req.onreadystatechange = function onreadystatechange() {
      if (req.readyState === 4) {
        if (
          (req.status >= 200 && req.status < 300) ||
          (url.substr(0, 7) === 'file://' && req.responseText)
        ) {
          resolve(req.responseText)
        } else {
          reject(new Error(`HTTP status: ${req.status} retrieving ${url}`))
        }
      }
    }
    req.send()
  })
}

/**
 * Convert a Base64-encoded string into its original representation.
 * Used for inline sourcemaps.
 *
 * @param {String} b64str Base-64 encoded string
 * @returns {String} original representation of the base64-encoded string.
 */
function _atob(b64str: string): string {
  if (typeof window !== 'undefined' && window.atob) {
    return window.atob(b64str)
  } else {
    throw new Error(
      'You must supply a polyfill for window.atob in this environment'
    )
  }
}

function _parseJson(string: string) {
  if (typeof JSON !== 'undefined' && JSON.parse) {
    return JSON.parse(string)
  } else {
    throw new Error(
      'You must supply a polyfill for JSON.parse in this environment'
    )
  }
}

function _findFunctionName(
  source: string,
  lineNumber: number,
  columnNumber: number
) {
  const syntaxes = [
    // {name} = function ({args}) TODO args capture
    /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*function\b/,
    // function {name}({args}) m[1]=name m[2]=args
    /function\s+([^('"`]*?)\s*\(([^)]*)\)/,
    // {name} = eval()
    /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*(?:eval|new Function)\b/,
    // fn_name() {
    /\b(?!(?:if|for|switch|while|with|catch)\b)(?:(?:static)\s+)?(\S+)\s*\(.*?\)\s*\{/,
    // {name} = () => {
    /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*\(.*?\)\s*=>/
  ]
  const lines = source.split('\n')

  // Walk backwards in the source lines until we find the line which matches one of the patterns above
  let code = ''
  const maxLines = Math.min(lineNumber, 20)
  for (let i = 0; i < maxLines; ++i) {
    // lineNo is 1-based, source[] is 0-based
    let line = lines[lineNumber - i - 1]
    const commentPos = line.indexOf('//')
    if (commentPos >= 0) {
      line = line.substr(0, commentPos)
    }

    if (line) {
      code = line + code
      const len = syntaxes.length
      for (let index = 0; index < len; index++) {
        const m = syntaxes[index].exec(code)
        if (m && m[1]) {
          return m[1]
        }
      }
    }
  }
  return undefined
}

function _ensureSupportedEnvironment() {
  if (
    typeof Object.defineProperty !== 'function' ||
    typeof Object.create !== 'function'
  ) {
    throw new Error('Unable to consume source maps in older browsers')
  }
}

function _ensureStackFrameIsLegit(stackframe: StackFrame) {
  if (typeof stackframe !== 'object') {
    throw new TypeError('Given StackFrame is not an object')
  } else if (typeof stackframe.fileName !== 'string') {
    throw new TypeError('Given file name is not a String')
  } else if (
    typeof stackframe.lineNumber !== 'number' ||
    stackframe.lineNumber % 1 !== 0 ||
    stackframe.lineNumber < 1
  ) {
    throw new TypeError('Given line number must be a positive integer')
  } else if (
    typeof stackframe.columnNumber !== 'number' ||
    stackframe.columnNumber % 1 !== 0 ||
    stackframe.columnNumber < 0
  ) {
    throw new TypeError('Given column number must be a non-negative integer')
  }
  return true
}

function _findSourceMappingURL(source: string) {
  const sourceMappingUrlRegExp = /\/\/[#@] ?sourceMappingURL=([^\s'"]+)\s*$/gm
  let lastSourceMappingUrl
  let matchSourceMappingUrl
  // eslint-disable-next-line no-cond-assign
  while ((matchSourceMappingUrl = sourceMappingUrlRegExp.exec(source))) {
    lastSourceMappingUrl = matchSourceMappingUrl[1]
  }
  if (lastSourceMappingUrl) {
    return lastSourceMappingUrl
  } else {
    throw new Error('sourceMappingURL not found')
  }
}

async function _extractLocationInfoFromSourceMapSource(
  stackframe: StackFrame,
  sourceMapConsumer: SourceMapConsumer,
  sourceCache: Record<string, string | PromiseLike<string>>
) {
  return new Promise<StackFrame>(function (resolve, reject) {
    const loc = sourceMapConsumer.originalPositionFor({
      line: stackframe.lineNumber!,
      column: stackframe.columnNumber!
    })

    if (loc.source) {
      // cache mapped sources
      const mappedSource = sourceMapConsumer.sourceContentFor(loc.source)
      if (mappedSource) {
        sourceCache[loc.source] = mappedSource
      }

      resolve(
        // given stackframe and source location, update stackframe
        new StackFrame({
          functionName: loc.name || stackframe.functionName,
          args: stackframe.args,
          fileName: loc.source,
          lineNumber: loc.line!,
          columnNumber: loc.column!
        })
      )
    } else {
      reject(
        new Error(
          'Could not get original source for given stackframe and source map'
        )
      )
    }
  })
}

/**
 * @constructor
 * @param {Object} opts
 *      opts.sourceCache = {url: "Source String"} => preload source cache
 *      opts.sourceMapConsumerCache = {/path/file.js.map: SourceMapConsumer}
 *      opts.offline = True to prevent network requests.
 *              Best effort without sources or source maps.
 *      opts.ajax = Promise returning function to make X-Domain requests
 */
export class StackTraceGPS {
  private sourceCache: Record<string, string | PromiseLike<string>>
  private sourceMapConsumerCache: Record<
    string,
    SourceMapConsumer | PromiseLike<SourceMapConsumer>
  >

  private ajax: (url: string) => Promise<string>
  private _atob: (a: string) => string
  private _offline: boolean
  private resultsCache: Record<string, StackFrame>

  constructor(opts?: {
    sourceCache?: Record<string, string | PromiseLike<string>>
    resultsCache?: Record<string, StackFrame>
    sourceMapConsumerCache?: Record<
      string,
      SourceMapConsumer | PromiseLike<SourceMapConsumer>
    >
    offline?: boolean
    ajax?: (url: string) => Promise<string>
    atob?: (a: string) => string
  }) {
    this.sourceCache = opts?.sourceCache ?? {}
    this.resultsCache = opts?.resultsCache ?? {}
    this.sourceMapConsumerCache = opts?.sourceMapConsumerCache ?? {}
    this.ajax = opts?.ajax ?? _xdr
    this._atob = opts?.atob ?? _atob
    this._offline = opts?.offline ?? false
  }

  async _get(location: string) {
    return new Promise<string>((resolve, reject) => {
      const isDataUrl = location.substr(0, 5) === 'data:'
      if (this.sourceCache[location]) {
        resolve(this.sourceCache[location])
      } else if (this._offline && !isDataUrl) {
        reject(new Error('Cannot make network requests in offline mode'))
      } else {
        if (isDataUrl) {
          // data URLs can have parameters.
          // see http://tools.ietf.org/html/rfc2397
          const supportedEncodingRegexp =
            /^data:application\/json;([\w=:"-]+;)*base64,/
          const match = location.match(supportedEncodingRegexp)
          if (match) {
            const sourceMapStart = match[0].length
            const encodedSource = location.substr(sourceMapStart)
            const source = this._atob(encodedSource)
            this.sourceCache[location] = source
            resolve(source)
          } else {
            reject(
              new Error('The encoding of the inline sourcemap is not supported')
            )
          }
        } else {
          const xhrPromise = this.ajax(location /*{ method: 'get' }*/)
          // Cache the Promise to prevent duplicate in-flight requests
          this.sourceCache[location] = xhrPromise
          xhrPromise.then(resolve, reject)
        }
      }
    })
  }

  /**
   * Creating SourceMapConsumers is expensive, so this wraps the creation of a
   * SourceMapConsumer in a per-instance cache.
   *
   * @param {String} sourceMappingURL = URL to fetch source map from
   * @param {String} defaultSourceRoot = Default source root for source map if undefined
   * @returns {Promise} that resolves a SourceMapConsumer
   */
  async _getSourceMapConsumer(
    sourceMappingURL: string,
    defaultSourceRoot: string
  ) {
    return new Promise<SourceMapConsumer>(resolve => {
      if (this.sourceMapConsumerCache[sourceMappingURL]) {
        resolve(this.sourceMapConsumerCache[sourceMappingURL])
      } else {
        const sourceMapConsumerPromise = new Promise<SourceMapConsumer>(
          (resolve, reject) => {
            this._get(sourceMappingURL)
              .then(function (_sourceMapSource) {
                let sourceMapSource: any = _sourceMapSource
                if (typeof sourceMapSource === 'string') {
                  sourceMapSource = _parseJson(
                    sourceMapSource.replace(/^\)\]\}'/, '')
                  )
                }
                if (typeof sourceMapSource.sourceRoot === 'undefined') {
                  sourceMapSource.sourceRoot = defaultSourceRoot
                }
                resolve(new SourceMap.SourceMapConsumer(sourceMapSource))
              })
              .catch(reject)
          }
        )
        this.sourceMapConsumerCache[sourceMappingURL] = sourceMapConsumerPromise
        resolve(sourceMapConsumerPromise)
      }
    })
  }

  /**
   * Given a StackFrame, enhance function name and use source maps for a
   * better StackFrame.
   *
   * @param {StackFrame} stackframe object
   * @returns {Promise} that resolves with with source-mapped StackFrame
   */
  async StackTraceGPS$$pinpoint(stackframe: StackFrame) {
    const key = this.resultsCacheKey('StackTraceGPS$$pinpoint', stackframe)
    if (this.resultsCache[key]) {
      return this.resultsCache[key] as unknown as StackFrame
    }

    return new Promise<StackFrame>((_resolve, reject) => {
      const resolve = (sf: StackFrame) => {
        this.resultsCache[key] = sf
        _resolve(sf)
      }

      this.StackTraceGPS$$getMappedLocation(stackframe).then(
        mappedStackFrame => {
          function resolveMappedStackFrame() {
            resolve(mappedStackFrame)
          }

          this.StackTraceGPS$$findFunctionName(mappedStackFrame)
            .then(resolve, resolveMappedStackFrame)
            .catch(resolveMappedStackFrame)
        },
        reject
      )
    })
  }

  /**
   * Given a StackFrame, guess function name from location information.
   *
   * @param {StackFrame} stackframe
   * @returns {Promise} that resolves with enhanced StackFrame.
   */
  async StackTraceGPS$$findFunctionName(stackframe: StackFrame) {
    const key = this.resultsCacheKey(
      'StackTraceGPS$$findFunctionName',
      stackframe
    )
    if (this.resultsCache[key]) {
      return this.resultsCache[key]
    }
    return new Promise<StackFrame>((resolve, reject) => {
      _ensureStackFrameIsLegit(stackframe)
      this._get(stackframe.fileName!)
        .then(source => {
          const lineNumber = stackframe.lineNumber!
          const columnNumber = stackframe.columnNumber!
          const guessedFunctionName = _findFunctionName(
            source,
            lineNumber,
            columnNumber
          )
          // Only replace functionName if we found something
          if (guessedFunctionName) {
            const stackFrame = new StackFrame({
              functionName: guessedFunctionName,
              args: stackframe.args,
              fileName: stackframe.fileName,
              lineNumber: lineNumber,
              columnNumber: columnNumber
            })
            this.resultsCache[key] = stackFrame
            resolve(stackFrame)
          } else {
            this.resultsCache[key] = stackframe
            resolve(stackframe)
          }
        }, reject)
        .catch(reject)
    })
  }

  resultsCacheKey(operation: string, stackFrame: StackFrame) {
    return [
      operation,
      stackFrame.fileName,
      stackFrame.lineNumber,
      stackFrame.columnNumber
    ].join(':')
  }

  /**
   * Given a StackFrame, seek source-mapped location and return new enhanced StackFrame.
   *
   * @param {StackFrame} stackframe
   * @returns {Promise} that resolves with enhanced StackFrame.
   */

  async StackTraceGPS$$getMappedLocation(stackframe: StackFrame) {
    const key = this.resultsCacheKey(
      'StackTraceGPS$$getMappedLocation',
      stackframe
    )
    if (this.resultsCache[key]) {
      return this.resultsCache[key]
    }

    return new Promise<StackFrame>((resolve, reject) => {
      _ensureSupportedEnvironment()
      _ensureStackFrameIsLegit(stackframe)

      const sourceCache = this.sourceCache
      const fileName = stackframe.fileName!
      this._get(fileName!)
        .then(async source => {
          let sourceMappingURL = _findSourceMappingURL(source)
          const isDataUrl = sourceMappingURL.substr(0, 5) === 'data:'
          const defaultSourceRoot = fileName.substring(
            0,
            fileName.lastIndexOf('/') + 1
          )

          if (
            sourceMappingURL[0] !== '/' &&
            !isDataUrl &&
            !/^https?:\/\/|^\/\//i.test(sourceMappingURL)
          ) {
            sourceMappingURL = defaultSourceRoot + sourceMappingURL
          }

          return this._getSourceMapConsumer(
            sourceMappingURL,
            defaultSourceRoot
          ).then(async sourceMapConsumer => {
            return _extractLocationInfoFromSourceMapSource(
              stackframe,
              sourceMapConsumer,
              sourceCache
            )
              .then(sf => {
                this.resultsCache[key] = sf
                resolve(sf)
              })
              .catch(function () {
                resolve(stackframe)
              })
          })
        }, reject)
        .catch(reject)
    })
  }
}
