const obs = require('../../../utils/observer')

let toggleCenter = false

obs('CONTROL').on('disable-video', () => {
  toggleCenter = !toggleCenter
  document
    .querySelector('.player .subtitles')
    .classList.toggle('center', toggleCenter)
})

let isEn = true

obs('CONTROL').on('toggle-pt-en-subtitle', () => {
  isEn = !isEn
  document.querySelector('#pt').style.display = isEn ? 'block' : 'none'

  document.querySelector('#en').style.display = isEn ? 'none' : 'block'

  document.querySelector('#pt').classList.toggle('only', isEn)
  document.querySelector('#en').classList.toggle('only', !isEn)
})

obs('CONTROL').on('put-pt-en-subtitle', () => {
  document.querySelector('#pt').style.display = 'block'
  document.querySelector('#en').style.display = 'block'

  document.querySelector('#pt').classList.toggle('only', false)
  document.querySelector('#en').classList.toggle('only', false)
})
