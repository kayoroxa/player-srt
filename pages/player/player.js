const obs = require('../../utils/observer')
const onlyMoviePlayer = require('./onlyMoviePlayer')
// const _STATE = require('./js/globalState')
const subtitle = require('./Subtitle')

let subtitlesDataEn = subtitle.subData.en
let subtitlesDataPt = subtitle.subData.pt
let indexSub = 0
let lastSubtitleEn = false

onlyMoviePlayer({
  subtitlesDataEn,
  subtitlesDataPt,
  indexSub,
  lastSubtitleEn,
})

// _STATE.onChange('subtitlesDataEn', data => {
//   subtitlesDataEn = data
// })
// _STATE.onChange('subtitlesDataPt', data => {
//   subtitlesDataPt = data
// })

// _STATE.set('subtitlesDataEn', subtitlesDataEn)
// _STATE.set('subtitlesDataPt', subtitlesDataPt)
// _STATE.set('indexSub', indexSub)
// _STATE.set('lastSubtitleEn', lastSubtitleEn)

obs('subtitle').on('getData', () => ({
  subtitlesDataEn,
  subtitlesDataPt,
  indexSub,
  lastSubtitleEn,
}))

obs('subtitle').on('get', func => {
  if (!subtitlesDataEn) return
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
