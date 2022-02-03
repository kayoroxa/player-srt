const obs = require('../../../utils/observer')

const video = document.querySelector('video')

function subSync() {}

video.addEventListener('timeupdate', subSync)

obs('TIME').on('change-by-index', ({ index }) => {
  obs('subtitle').notify('get', ({ subtitlesDataEn }) => {
    video.currentTime = subtitlesDataEn[index].startTime
  })
})
