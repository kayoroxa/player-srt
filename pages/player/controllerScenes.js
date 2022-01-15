const { times, timesEnd } = require('../../config-player')
const video = document.querySelector('video')
// const convertTimeStr = require('../../utils/convertHHMMSS')
//on key down change video current time

const convertTimeStr = require('../../utils/convertHHMMSS')

let indexTime = 0
// video = document.querySelector('video')
video.currentTime = convertTimeStr(times[indexTime][0])

let canStop = true
let repeating = false
// let forceStopTeach = true

document.addEventListener('keydown', e => {
  // console.log(e.key)
  if (e.key === 'PageUp' && indexTime < times.length - 1) {
    fadeIn(0.01)
    indexTime++
    video.currentTime = convertTimeStr(times[indexTime][0])
    video.play()
    canStop = true
    obs('warning').notify('show', {
      title: 'Scene',
      message: `${indexTime + 1}/${times.length}`,
    })
  } else if (e.key === 'PageDown' && indexTime > 0) {
    fadeIn(0.01)
    indexTime--
    video.currentTime = convertTimeStr(times[indexTime][0])
    video.play()
    canStop = true
    obs('warning').notify('show', {
      title: 'Scene',
      message: `${indexTime + 1}/${times.length}`,
    })
  }
  if (e.key === 'd' || e.key === 'D') {
    fadeIn()
    video.currentTime = subtitlesDataEn[indexSub + 1].startTime
  } else if (e.key === 'a' || e.key === 'A') {
    fadeIn()
    video.currentTime = subtitlesDataEn[indexSub - 1].startTime
  } else if (e.key === 's' || e.key === 'S') {
    fadeIn()
    video.currentTime = lastSubtitleEn.startTime
  }
  if (e.key === 'r' || e.key === 'R') {
    //reoetir video
    repeating = !repeating

    obs('warning').notify('show', {
      title: `Repeating: ${repeating}`,
    })

    if (!repeating) {
      canStop = true
      return
    }

    canStop = false

    const handle = () => {
      if (!repeating) {
        video.removeEventListener('timeupdate', handle)
        return
      }
      if (video.currentTime >= subtitlesDataEn[indexSub].endTime - 0.2) {
        video.currentTime = subtitlesDataEn[indexSub].startTime
      }
    }
    video.addEventListener('timeupdate', handle)
  }
  if (e.key === ' ') {
    e.preventDefault()
    if (video.paused) {
      video.classList.remove('paused')
      document.querySelector('.subtitles').classList.remove('hide')
      video.play()
    } else {
      if (!video.controls) {
        document.querySelector('.subtitles').classList.add('hide')
        video.classList.add('paused')
      }
      const timer = setInterval(() => {
        if (video.volume > 0) {
          video.volume -= 0.1
          if (video.volume - 0.1 < 0) {
            video.pause()
            video.volume = 0
          }
        } else {
          clearInterval(timer)
        }
      }, 20)
    }
  }
  if (e.key === 'ArrowRight') {
    video.currentTime += 1
  }
  if (e.key === 'ArrowLeft') {
    video.currentTime -= 1
  }
  if (e.key === 'c' || e.key === 'C') {
    video.controls = !video.controls
  }
  if (e.key === 'l' || e.key === 'L') {
    document.querySelector('.subtitles').classList.toggle('hide')
  }
})

//on video time update more than time end

video.addEventListener('timeupdate', () => {
  if (video.currentTime >= convertTimeStr(times[indexTime][1])) {
    if (canStop) video.pause()
    canStop = false
  }
})

function fadeIn(increment = 0.1) {
  console.log('fadeIn')
  video.volume = 0
  const timer = setInterval(() => {
    if (video.volume < 1) {
      video.volume += increment
      if (video.volume + increment > 1) {
        video.volume = 1
      }
    } else {
      clearInterval(timer)
    }
  }, 20)
}
//on change current time

video.addEventListener('play', () => {
  fadeIn()
})
