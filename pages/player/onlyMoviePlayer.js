const fs = require('fs')
const pathJoin = require('path').join
const config = require('../../config-player')
const pathMovie = config.path
const { textToInner } = require('../../utils/text-funcs')
const subEn = document.querySelector('p.en')
const subPt = document.querySelector('p.pt')
const ctsElem = document.querySelector('.cts')
const convertTimeStr = require('../../utils/convertHHMMSS')
const obs = require('../../utils/observer')
const subtitle = require('./Subtitle')
let lastSubtitleEn = 0
let indexSub = 0

obs('subtitle').on('change', ({ subEn, subPt }) => {
  // console.log(subEn)
  subtitle.data.en = subEn
  // subtitle.changeSrt
  if (subPt) subtitle.data.pt = subPt
  else subtitle.data.pt = []
})

function getIndexSub(currentTimeMs) {
  return subtitle.data.en.reduce((acc, sub, i) => {
    if (sub.startTime <= currentTimeMs && sub.endTime >= currentTimeMs) {
      return i
    } else if (sub.startTime <= currentTimeMs) return i + 1
    return acc
  }, -1)
}

function handleSubtitleShow(event) {
  if (!subtitle.data.en || subtitle.data.en.length < 2)
    return (subEn.textContent = 'sem srt')

  const currentTimeMs = event.target.currentTime
  if (!subtitle.data.en?.find) {
    throw new Error('subtitle.data.en is not an array')
  }

  const currentSubtitleEn = subtitle.subData.en?.find(sub => {
    return sub.startTime <= currentTimeMs && sub.endTime >= currentTimeMs
  })

  const currentSubtitlePt = subtitle.subData.pt?.find(sub => {
    return sub.startTime <= currentTimeMs && sub.endTime >= currentTimeMs
  })

  lastSubtitleEn = currentSubtitleEn || lastSubtitleEn
  // debugger

  //get index of subtitle more closer to current time
  const oldIndexSub = subtitle.getIndexSub()

  indexSub = getIndexSub(currentTimeMs)
  if (oldIndexSub !== indexSub) {
    // console.log('oiii')'
    obs('subtitle').notify('sentence-sub-end')
  }

  subtitle.changeIndexSub(indexSub)

  // console.log({ currentSubtitle, currentTimeMs })
  if (currentSubtitleEn) {
    // obs('warning').notify('show', {
    //   title: currentSubtitleEn.raw,
    // })
    subEn.innerHTML = textToInner(currentSubtitleEn.text)
  } else {
    subEn.innerHTML = ''
  }
  if (currentSubtitlePt) {
    subPt.innerHTML = textToInner(currentSubtitlePt.text, { portuguese: true })
  } else {
    subPt.innerHTML = ''
  }
}

function findVideoPath(type, options) {
  const files = fs.readdirSync(pathMovie)
  let file
  let types

  if (Array.isArray(type)) {
    types = type
  } else {
    types = [type]
  }

  if (!type) types = ['.mp4', '.mkv', '.avi', '.mov']

  if (!options?.pt) {
    file = files.find(
      file =>
        types.some(type => file.toLowerCase().endsWith(type)) &&
        !file.includes('port') &&
        !file.includes('pt')
    )
  } else {
    file = files.find(
      file =>
        types.some(type => file.toLowerCase().endsWith(type)) &&
        (file.includes('port') || file.includes('pt'))
    )
  }
  if (!file) {
    return
  } else {
    return pathJoin(pathMovie, file)
  }
}

function onlyMoviePlayer() {
  const video = document.querySelector('video')
  video.src = findVideoPath()

  if (config.start) {
    video.currentTime = convertTimeStr(config.start)
  }
  video.addEventListener('timeupdate', handleSubtitleShow)
}

onlyMoviePlayer()
// module.exports = onlyMoviePlayer
