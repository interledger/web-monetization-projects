// By prefixing them with T, we can avoid conflicting with types of the same
// name and also allow easy auto importing by the IDE.

export const TExpressApp = Symbol.for('ExpressApp')
export const THttpServer = Symbol.for('HttpServer')
export const THttpServerPort = Symbol.for('HttpServerPort')
export const TLogger = Symbol.for('Logger')
export const TStreamServer = Symbol.for('TStreamServer')
