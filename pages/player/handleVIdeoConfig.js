const { times, timesEnd } = require('../../config-player')
const video = document.querySelector('video')
// const convertTimeStr = require('../../utils/convertHHMMSS')
//on key down change video current time

const convertTimeStr = require('../../utils/convertHHMMSS')
// const obs = require('../../utils/observer')

// video = document.querySelector('video')

let lastRepeatIndexSub

let shortCutActive = true

obs('command').on('toggle', isActive => {
  shortCutActive = isActive
})
// let forceStopTeach = true

function repeatSubtitle() {
  obs('command').notify('keyDown', () => {
    obs('repetition').notify('toggle', {
      start: subtitlesDataEn[indexSub].startTime,
      end: subtitlesDataEn[indexSub].endTime,
    })
  })
}

function videoPlayToggle(e) {
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
function handleVideoConfig(method) {
  if (method === 'control-toggle') {
    video.controls = !video.controls
  } else if (method === 'subtitle-toggle') {
    document.querySelector('.subtitles').classList.toggle('hide')
  }
}

obs('CONTROL').on('subtitle-repeat-toggle', repeatSubtitle)
obs('CONTROL').on('video-play-toggle', videoPlayToggle)
obs('CONTROL').on('subtitle-repeat-toggle')

obs('CONTROL').on('video-config', handleVideoConfig)
obs('CONTROL').on('subtitle-show-toggle', toggle =>
  document.querySelector('.subtitles').classList.toggle('hide', !toggle)
)

obs('CONTROL').on('video-walking-next-time', () => {
  video.currentTime += 1
})
obs('CONTROL').on('video-walking-prev-time', () => {
  video.currentTime -= 1
})

//on video time update more than time end

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

// function changeVideoTime(time, newIndexSub) {
//   lastRepeatIndexSub = newIndexSub
//   console.log('changeVideoTime', lastRepeatIndexSub)
//   debugger
//   video.currentTime = time
//   // setTimeout(() => {
//   // }, 500)
// }
