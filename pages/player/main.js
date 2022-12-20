function app() {
  require('./js/warning')
  require('./js/repetitionVideo')
  require('./js/mostFastSentence')
  require('./js/velocityControl')
  require('./js/searchSentence')
  require('./js/controlF')
  require('./js/video')
  require('./js/controls')
  require('./js/syncVideoSubtitle')
  require('./js/shiftSubtitle')
  require('./js/changeTimeVideo')
  require('./js/editSrt')
  require('./js/dynamicallyVelocity')
  require('./js/info')
  require('./js/gameToWatch')
  require('./js/saveClip')
  require('./js/checkPoint')
  // require('./js/clips')
  require('./js/lyrics')
  // require('./player.js')

  require('./js/handleVideoConfig')
  require('./onlyMoviePlayer')
  require('./handleRouter.js')
}

app()

// const pathJoin = require('path').join

// let toggleHome = false

// document.addEventListener('keydown', e => {
//   if (e.key.toLowerCase() === 'escape') {
//     if (!toggleHome) {
//       window.location.href = pathJoin(
//         'file:///',
//         __dirname,
//         '../home/index.html'
//       )
//       toggleHome = true
//     } else {
//       window.location.href = pathJoin(
//         'file:///',
//         __dirname,
//         '../player/player.html'
//       )
//       toggleHome = false
//     }
//   }
// })
