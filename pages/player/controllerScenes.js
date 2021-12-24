const { times, timesEnd } = require('../../config-player.json')
const video = document.querySelector('video')
// const convertTimeStr = require('../../utils/convertHHMMSS')
//on key down change video current time

let indexTime = 0
video.currentTime = convertTimeStr(times[indexTime][0])

let canStop = true

document.addEventListener('keydown', e => {
  // console.log(times)
  if (e.key === 'd' && indexTime < times.length - 1) {
    indexTime++
    video.currentTime = convertTimeStr(times[indexTime][0])
    video.play()
    canStop = true
  } else if (e.key === 'a' && indexTime > 0) {
    indexTime--
    video.currentTime = convertTimeStr(times[indexTime][0])
    video.play()
    canStop = true
  }
})

//on video time update more than time end

video.addEventListener('timeupdate', () => {
  if (video.currentTime >= convertTimeStr(times[indexTime][1])) {
    if (canStop) video.pause()
    canStop = false
  }
})
