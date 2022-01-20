const obs = require('../../utils/observer')
const onlyMoviePlayer = require('./onlyMoviePlayer')

let subtitlesDataEn
let subtitlesDataPt
let indexSub = 0
let lastSubtitleEn = false

onlyMoviePlayer({
  subtitlesDataEn,
  subtitlesDataPt,
  indexSub,
  lastSubtitleEn,
})

obs('subtitle').on('get', func => {
  func({
    subtitlesDataEn,
    subtitlesDataPt,
    indexSub,
    lastSubtitleEn,
  })
})

obs('command').on('keyDown', fuc => {
  fuc({
    subtitlesDataEn,
    subtitlesDataPt,
    indexSub,
    lastSubtitleEn,
  })
})
