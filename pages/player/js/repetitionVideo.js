const obs = require('../../../utils/observer')

let repeating
const handleVideo = HandleVideo()

obs('repetition').on('toggle', ({ start, end }) => {
  repeating = !repeating
  console.log('toggle')
  obs('warning').notify('show', {
    title: `Repetition ${repeating}`,
  })
  handleVideo.create({ start, end })
})

obs('command').on('changeTime', ({ start, end }) => {
  if (!repeating) {
    // canStop = true
    return
  }
  console.log('changeTime', { start, end })
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
