const obs = require('../../../utils/observer')
const subtitle = require('../Subtitle')

let repeating
const loopVideo = LoopVideo()

obs('repetition').on('toggle', toggle => {
  repeating = toggle ? toggle : !repeating
  obs('warning').notify('show', {
    title: `Repetition ${repeating}`,
  })
  // const { text } = subtitle.getLastSub().en
  loopVideo.create()
  obs('repetition').notify('changed', repeating)
})

obs('command').on('changeTime', () => {
  if (!repeating) {
    // canStop = true
    return
  }
  // handleVideo.create({ start, end })
})

function LoopVideo() {
  const video = document.querySelector('video')

  const handle = (start, end) => {
    console.log({ end })
    if (!repeating) {
      video.removeEventListener('timeupdate', handle)
      return
    }
    if (video.currentTime >= end - 0.05) {
      video.currentTime = start
      const { startTime, endTime } = subtitle.getLastSub().en
      start = startTime
      end = endTime
    }
  }
  video.addEventListener('timeupdate', handle)
  return {
    create: () => {
      const { startTime, endTime } = subtitle.getLastSub().en
      video.removeEventListener('timeupdate', () => handle(startTime, endTime))
      video.addEventListener('timeupdate', () => handle(startTime, endTime))
    },
  }
}
