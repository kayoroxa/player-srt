const { times } = require('../../../config-player')
const convertTimeStr = require('../../../utils/convertHHMMSS')
const obs = require('../../../utils/observer')
const subtitle = require('../Subtitle')
const video = document.querySelector('video')

let indexTime = 0
let canStop = true

video.currentTime = times[indexTime] ? convertTimeStr(times[indexTime][0]) : 0

function nextScene() {
  if (indexTime < times.length - 1) {
    // obs('command').notify('keyDown', () => {
    // fadeIn(0.01)
    indexTime++
    video.currentTime = convertTimeStr(times[indexTime][0])
    video.play()
    canStop = true
    obs('warning').notify('show', {
      title: 'Scene',
      message: `${indexTime + 1}/${times.length}`,
    })

    // const translation = subtitle.subData.pt
    //   .filter(
    //     sub =>
    //       sub.startTime > convertTimeStr(times[indexTime][0]) &&
    //       sub.startTime < convertTimeStr(times[indexTime][1])
    //   )
    //   .map(sub => sub.text)
    //   .join('\n')
    // debugger
    // console.log(subtitle.subData.pt[0])
    // console.log(translation)
  }
}
function prevScene() {
  if (indexTime > 0) {
    // obs('command').notify('keyDown', () => {
    // fadeIn(0.01)
    indexTime--
    video.currentTime = convertTimeStr(times[indexTime][0])
    video.play()
    canStop = true
    obs('warning').notify('show', {
      title: 'Scene',
      message: `${indexTime + 1}/${times.length}`,
    })

    // const translation = subtitle.subData.pt.filter(
    //   sub =>
    //     sub.startTime > times[indexTime][0] &&
    //     sub.startTime < times[indexTime][1]
    // )

    // console.log(translation)
    // })
  }
}
function nextSubtitle() {
  // fadeIn()
  // const realNext = video.currentTime >= subtitle.getLastSub().en.startTime
  const { en } = subtitle.changeIndexSub(
    index => index + 1
    // realNext ? index + 1 : index
  )
  video.currentTime = en.startTime + 0.01
  obs('command').notify('changeTime', {
    start: en.startTime,
    end: en.endTime,
  })
}
function prevSubtitle() {
  // fadeIn()
  const { en } = subtitle.changeIndexSub(index => index - 1)
  video.currentTime = en.startTime + 0.01
  obs('command').notify('changeTime', {
    start: en.startTime,
    end: en.endTime,
  })
}

function currentSubtitle() {
  // debugger
  const last = subtitle.getLastSub().en.startTime
  if (video.currentTime < last + 0.2) {
    const { en } = subtitle.changeIndexSub(index => index - 1)
    video.currentTime = en.startTime + 0.01
  } else {
    video.currentTime = last + 0.01
  }
}

video.addEventListener('timeupdate', () => {
  if (video.currentTime >= convertTimeStr(times[indexTime][1]) + 2) {
    if (canStop) video.pause()
    canStop = false
  }
})

// let interval = null

function preventControl(callback) {
  // if (interval) clearInterval(interval)
  // document.querySelector('video').controls = false

  // interval = setInterval(() => {
  //   document.querySelector('video').controls = true
  // }, 2000)

  callback()
}

obs('CONTROL').on('scene-next', () => preventControl(nextScene))
obs('CONTROL').on('scene-prev', () => preventControl(prevScene))
obs('CONTROL').on('subtitle-next', () => preventControl(nextSubtitle))
obs('CONTROL').on('subtitle-prev', () => preventControl(prevSubtitle))
obs('CONTROL').on('subtitle-current', () => preventControl(currentSubtitle))
