const obs = require('../../../utils/observer')
const subtitle = require('../Subtitle')

let currentVelocity = 1

obs('CONTROL').on('video-speed-fast', () => {
  currentVelocity += 0.1
  if (currentVelocity > 4) currentVelocity = 4
  document.querySelector('video').playbackRate = currentVelocity

  obs('warning').notify('show', {
    title: 'Velocity',
    message: Math.round(currentVelocity * 10) / 10,
  })
})

let lastFolderMovie
obs('subtitle').on('change', () => {
  if (lastFolderMovie !== subtitle.infoPath.folder) {
    document.querySelector('video').playbackRate = currentVelocity
  }
})

obs('CONTROL').on('video-speed-slow', () => {
  currentVelocity -= 0.1
  if (currentVelocity < 0.1) currentVelocity = 0.1
  document.querySelector('video').playbackRate = currentVelocity

  obs('warning').notify('show', {
    title: 'Velocity',
    message: Math.round(currentVelocity * 10) / 10,
  })
})
