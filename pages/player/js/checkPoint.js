const obs = require('../../../utils/observer')
let lastCheckPoint = false

obs('CONTROL').on('check-point-set', () => {
  const video = document.querySelector('video')
  lastCheckPoint = video.currentTime
  // obs('warning').notify('show', {
  //   title: 'Checkpoint Set',
  //   message: lastCheckPoint,
  // })
})

obs('CONTROL').on('check-point-back', () => {
  const video = document.querySelector('video')
  video.currentTime = lastCheckPoint

  // obs('warning').notify('show', {
  //   title: 'Checkpoint Back',
  //   message: lastCheckPoint,
  // })
})
