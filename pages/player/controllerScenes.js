const { times, timesEnd } = require('../../config-player')
const video = document.querySelector('video')
// const convertTimeStr = require('../../utils/convertHHMMSS')
//on key down change video current time

const convertTimeStr = require('../../utils/convertHHMMSS')

let indexTime = 0
// video = document.querySelector('video')
video.currentTime = convertTimeStr(times[indexTime][0])

let canStop = true

document.addEventListener('keydown', e => {
  console.log(e.key)
  if (e.key === 'PageUp' && indexTime < times.length - 1) {
    indexTime++
    video.currentTime = convertTimeStr(times[indexTime][0])
    video.play()
    canStop = true
  } else if (e.key === 'PageDown' && indexTime > 0) {
    indexTime--
    video.currentTime = convertTimeStr(times[indexTime][0])
    video.play()
    canStop = true
  }
  if (e.key === 'd') {
    video.currentTime = subtitlesDataEn[indexSub + 1].startTime
  } else if (e.key === 'a') {
    video.currentTime = subtitlesDataEn[indexSub - 1].startTime
  } else if (e.key === 's') {
    video.currentTime = lastSubtitleEn.startTime
  }
  if (e.key === ' ') {
    e.preventDefault()
    if (video.paused) {
      video.play()
    } else {
      video.pause()
    }
  }
})

//on video time update more than time end

video.addEventListener('timeupdate', () => {
  if (video.currentTime >= convertTimeStr(times[indexTime][1])) {
    if (canStop) video.pause()
    canStop = false
  }
})
