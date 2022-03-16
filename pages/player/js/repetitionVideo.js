const obs = require('../../../utils/observer')
const subtitle = require('../Subtitle')

let repeating
const handleVideo = HandleVideo()

obs('repetition').on('toggle', () => {
  repeating = !repeating
  obs('warning').notify('show', {
    title: `Repetition ${repeating}`,
  })
  const { startTime, endTime, text } = subtitle.getLastSub().en
  console.log(text)
  handleVideo.create({ start: startTime, end: endTime })
  obs('repetition').notify('changed', repeating)
})

obs('command').on('changeTime', () => {
  if (!repeating) {
    // canStop = true
    return
  }
  // handleVideo.create({ start, end })
})

function HandleVideo() {
  const video = document.querySelector('video')
  const handle = ({ start, end }) => {
    if (!repeating) {
      video.removeEventListener('timeupdate', handle)
      return
    }
    if (video.currentTime >= end) {
      video.currentTime = start
    }
  }
  video.addEventListener('timeupdate', handle)
  return {
    create: ({ start, end }) => {
      video.removeEventListener('timeupdate', () => handle({ start, end }))
      video.addEventListener('timeupdate', () => handle({ start, end }))
    },
  }
}
