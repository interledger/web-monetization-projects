/* eslint-disable no-console,@typescript-eslint/no-non-null-assertion */

import * as nodeWindowManager from 'node-window-manager'
import * as nutTree from '@nut-tree/nut-js'
import { centerOf, straightTo } from '@nut-tree/nut-js'

// import '@nut-tree/template-matcher'
// "@u4/opencv-build": "^0.5.6",
// "@u4/opencv4nodejs": "^6.2.4",

const wm = nodeWindowManager.windowManager
const log = console.log.bind(console)

interface WindowDetails {
  title: string
  // NUT windowHandle, node-window-manager id
  id: number
  processId: number
  path: string
  region: nutTree.Region
  mainScreen: boolean
}

const getScreenDimensions = (() => {
  let height: number
  let width: number

  return async () => {
    if (typeof height === 'undefined') {
      height = await nutTree.screen.height()
      width = await nutTree.screen.width()
    }
    return { height, width }
  }
})()

async function isInsideScreen(region: nutTree.Region) {
  const { height, width } = await getScreenDimensions()
  const yBottomInsideScreen = region.top + region.height <= height
  const xRightInsideScreen = region.left + region.width <= width
  const yTopInsideScreen = region.top >= 0
  const xLeftInsideScreen = region.left >= 0
  return (
    yTopInsideScreen &&
    yBottomInsideScreen &&
    xLeftInsideScreen &&
    xRightInsideScreen
  )
}

async function getAllWindows() {
  const nwmWindows = wm.getWindows()
  const nutWindows = await nutTree.getWindows()
  const joinedWindows: WindowDetails[] = []
  for (const nwm of nwmWindows) {
    const nutWindow = nutWindows.find(w => w['windowHandle'] === nwm.id)
    if (!nutWindow) {
      log('no nutWindow with windowHandle', nwm.id)
      continue
    }

    const region = await nutWindow.region
    const mainScreen = await isInsideScreen(region)
    const joined: WindowDetails = {
      id: nwm.id,
      title: nwm.getTitle(),
      processId: nwm.processId,
      path: nwm.path,
      mainScreen,
      region
    }
    joinedWindows.push(joined)
  }
  return joinedWindows
}

function findWindow(
  titleIncludes: string,
  windows: WindowDetails[],
  filter?: (w: WindowDetails) => boolean
) {
  return windows.find(
    w =>
      w.title.toLowerCase().includes(titleIncludes) &&
      (filter ? filter(w) : true)
  )
}

function inTopRight(
  container: nutTree.Region,
  width: number,
  height: number,
  top = 0,
  right = 0
) {
  const topRight = {
    width,
    height,
    top: container.top + top,
    left: container.left + container.width - width - right
  }
  return new nutTree.Region(topRight.left, topRight.top, width, height)
}

async function tapKeys(
  ...keys: Array<keyof typeof nutTree.Key>
): Promise<void> {
  const mapped = keys.map(k => nutTree.Key[k])
  await nutTree.keyboard.pressKey(...mapped)
  await nutTree.keyboard.releaseKey(...mapped)
}

async function findInRegion(
  region: nutTree.Region,
  image: string,
  name: string
) {
  // Extensions button
  const img = await nutTree.loadImage(image)
  await nutTree.screen.highlight(region)
  const search = await nutTree.screen.find(img, {
    confidence: 0.8,
    searchMultipleScales: true,
    searchRegion: region
  })
  const before = nutTree.screen.config.highlightDurationMs
  nutTree.screen.config.highlightDurationMs = before / 3
  await nutTree.screen.highlight(search)
  nutTree.screen.config.highlightDurationMs = before
  return search
}

async function clickOn(region: nutTree.Region) {
  if (nutTree.mouse.config.mouseSpeed === 0) {
    nutTree.mouse.setPosition(await centerOf(region))
  } else {
    await nutTree.mouse.move(straightTo(centerOf(region)), (x: number) => {
      return 1 - Math.cos((x * Math.PI) / 2)
    })
  }
  await nutTree.mouse.leftClick()
}

function topRightQuarter(region: nutTree.Region) {
  return inTopRight(region, region.width / 2, region.height / 2, 0, 0)
}

function resource(fn: string) {
  return `${__dirname}/resources/${fn}`
}

async function main() {
  const extensionsButton = resource('extensions.png')
  const coilPreviewRow = resource('coilpreview-extension.png')
  const extensionPin = resource('pin.png')

  nutTree.screen.config.highlightDurationMs = 0
  nutTree.keyboard.config.autoDelayMs = 50
  nutTree.mouse.config.mouseSpeed = 0

  const all = await getAllWindows()
  const chrome = findWindow('chrome', all, w => w.mainScreen)
  if (!chrome) {
    log('could not find chrome window')
    return
  } else {
    log('found chrome', chrome)
    await nutTree.screen.highlight(chrome.region)
  }

  await clickOn(chrome.region)

  const search = await findInRegion(
    inTopRight(chrome.region, 200, 100, 10, 10),
    extensionsButton,
    'extensionsButton'
  )
  await clickOn(search)

  const previewRow = await findInRegion(
    topRightQuarter(chrome.region),
    coilPreviewRow,
    'coilPreviewRow'
  )

  const pin = await findInRegion(previewRow, extensionPin, 'extensionPin')
  await clickOn(pin)

  const url = `https://www.google.com?date=${Date.now()}`
  await nutTree.clipboard.copy(url)

  // Focus the omnibar
  await tapKeys('LeftSuper', 'L')
  // Paste the url
  await tapKeys('LeftSuper', 'V')
  // Commit the url and navigate
  await tapKeys('Enter')

  console.log('highlighted')
  // const mat = cv.imread(coilIconPath)
  // console.log('raw', mat.atRaw(0, 5))
}

main().catch(console.error)
