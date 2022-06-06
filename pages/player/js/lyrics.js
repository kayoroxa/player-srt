const obs = require('../../../utils/observer')

let toggleCenter = false

obs('CONTROL').on('disable-video', () => {
  toggleCenter = !toggleCenter
  document
    .querySelector('.player .subtitles')
    .classList.toggle('center', toggleCenter)
})

let toggleSubtitle = true

obs('CONTROL').on('toggle-pt-subtitle', () => {
  toggleSubtitle = !toggleSubtitle
  document.querySelector('.player .subtitles .pt').style.display =
    toggleSubtitle ? 'block' : 'none'
})
