const { times, timesEnd } = require('../../config-player')
const video = document.querySelector('video')
// const convertTimeStr = require('../../utils/convertHHMMSS')
//on key down change video current time

const convertTimeStr = require('../../utils/convertHHMMSS')
// const obs = require('../../utils/observer')

let indexTime = 0
// video = document.querySelector('video')
video.currentTime = convertTimeStr(times[indexTime][0])

let canStop = true

let lastRepeatIndexSub

let shortCutActive = true

obs('command').on('toggle', isActive => {
  shortCutActive = isActive
})
// let forceStopTeach = true

function nextScene() {
  if (indexTime < times.length - 1) {
    obs('command').notify('keyDown', fuc => {
      fadeIn(0.01)
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
  console.log('oii')
  if (indexTime > 0) {
    obs('command').notify('keyDown', fuc => {
      fadeIn(0.01)
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
  obs('command').notify('keyDown', () => {
    fadeIn()
    video.currentTime = subtitlesDataEn[indexSub + 1].startTime
    obs('command').notify('changeTime', {
      start: subtitlesDataEn[indexSub + 1].startTime,
      end: subtitlesDataEn[indexSub + 1].endTime,
    })
  })
}
function prevSubtitle() {
  obs('command').notify('keyDown', () => {
    fadeIn()
    video.currentTime = subtitlesDataEn[indexSub - 1].startTime
    obs('command').notify('changeTime', {
      start: subtitlesDataEn[indexSub - 1].startTime,
      end: subtitlesDataEn[indexSub - 1].endTime,
    })
  })
}

function currentSubtitle() {
  fadeIn()
  video.currentTime = lastSubtitleEn.startTime
}
function repeatSubtitle() {
  obs('command').notify('keyDown', () => {
    obs('repetition').notify('toggle', {
      start: subtitlesDataEn[indexSub].startTime,
      end: subtitlesDataEn[indexSub].endTime,
    })
  })
}
obs('CONTROL').on('scene-next', nextScene)
obs('CONTROL').on('scene-prev', prevScene)
obs('CONTROL').on('subtitle-next', nextSubtitle)
obs('CONTROL').on('subtitle-prev', prevSubtitle)
obs('CONTROL').on('subtitle-current', currentSubtitle)
obs('CONTROL').on('subtitle-repeat-toggle', repeatSubtitle)

document.addEventListener('keydown', e => {
  if (!shortCutActive) return
  if (e.key === ' ') {
    e.preventDefault()
    if (video.paused) {
      video.classList.remove('paused')
      // document.querySelector('.subtitles').classList.remove('hide')
      video.play()
    } else {
      if (!video.controls) {
        // document.querySelector('.subtitles').classList.add('hide')
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

function changeVideoTime(time, newIndexSub) {
  lastRepeatIndexSub = newIndexSub
  console.log('changeVideoTime', lastRepeatIndexSub)
  debugger
  video.currentTime = time
  // setTimeout(() => {
  // }, 500)
}
