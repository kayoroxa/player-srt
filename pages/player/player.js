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

// function splitSubtitlePtSpans() {
//   const pt = document.querySelector('#pt')
//   // pt.innerHTML = pt.innerHTML.split(' ').join('</span><span>')
//   const palavras = pt.innerHTML?.match(/[^\s|!|.|,]+/g)
//   console.log(palavras)

//   const newInner = palavras.reduce((acc, cur) => {
//     return acc.replace(cur, `<span>${cur}</span>`)
//   }, pt.innerHTML)

//   pt.innerHTML = newInner

//   pt.querySelectorAll('span').forEach(span => {
//     span.addEventListener('click', () => {
//       span.classList.toggle('teach')
//     })
//   })
// }

// // splitSubtitlePtSpans()

// //global variable
// window.splitSubtitlePtSpans = splitSubtitlePtSpans
