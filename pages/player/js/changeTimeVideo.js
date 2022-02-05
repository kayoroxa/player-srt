const { times } = require('../../../config-player')
const convertTimeStr = require('../../../utils/convertHHMMSS')
const obs = require('../../../utils/observer')
const subtitle = require('../Subtitle')
const video = document.querySelector('video')

let indexTime = 0
let canStop = true

video.currentTime = convertTimeStr(times[indexTime][0])

function nextScene() {
  if (indexTime < times.length - 1) {
    obs('command').notify('keyDown', () => {
      // fadeIn(0.01)
      indexTime++
      video.currentTime = convertTimeStr(times[indexTime][0])
      video.play()
      canStop = true
      obs('warning').notify('show', {
        title: 'Scene',
        message: `${indexTime + 1}/${times.length}`,
      })
    })
  }
}
function prevScene() {
  if (indexTime > 0) {
    obs('command').notify('keyDown', () => {
      // fadeIn(0.01)
      indexTime--
      video.currentTime = convertTimeStr(times[indexTime][0])
      video.play()
      canStop = true
      obs('warning').notify('show', {
        title: 'Scene',
        message: `${indexTime + 1}/${times.length}`,
      })
    })
  }
}
function nextSubtitle() {
  // fadeIn()
  const { en } = subtitle.changeIndexSub(index => index + 1)
  video.currentTime = en.startTime
  obs('command').notify('changeTime', {
    start: en.startTime,
    end: en.endTime,
  })
}
function prevSubtitle() {
  // fadeIn()
  const { en } = subtitle.changeIndexSub(index => index - 1)
  video.currentTime = en.startTime
  obs('command').notify('changeTime', {
    start: en.startTime,
    end: en.endTime,
  })
}

function currentSubtitle() {
  video.currentTime = subtitle.getLastSub().en.startTime
}

video.addEventListener('timeupdate', () => {
  if (video.currentTime >= convertTimeStr(times[indexTime][1])) {
    if (canStop) video.pause()
    canStop = false
  }
})

obs('CONTROL').on('scene-next', nextScene)
obs('CONTROL').on('scene-prev', prevScene)
obs('CONTROL').on('subtitle-next', nextSubtitle)
obs('CONTROL').on('subtitle-prev', prevSubtitle)
obs('CONTROL').on('subtitle-current', currentSubtitle)
