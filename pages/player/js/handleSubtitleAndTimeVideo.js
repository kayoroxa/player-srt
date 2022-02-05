const obs = require('../../../utils/observer')
const video = document.querySelector('video')

obs('TIME').on('change-by-index', ({ index }) => {
  video.currentTime = subtitlesDataEn[index + 1].startTime
})
obs('TIME').on('change-by-time', ({ time }) => {
  video.currentTime = time
})
