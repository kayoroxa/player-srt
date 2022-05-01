const obs = require('../../../utils/observer')

let toggleCenter = false

obs('CONTROL').on('disable-video', () => {
  toggleCenter = !toggleCenter
  document
    .querySelector('.player .subtitles')
    .classList.toggle('center', toggleCenter)
})
