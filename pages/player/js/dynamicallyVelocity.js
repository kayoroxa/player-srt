// const obs = require('../../../utils/observer')
// const subtitle = require('../Subtitle')

// function dynamicallyVelocity(event) {
//   // return
//   const videoCurrentTime = event.target.currentTime
//   const nextSubtitle =
//     subtitle.subData.en[subtitle.getLastSub().subsIndex.en + 1]
//   const atualSubtitle = subtitle.getLastSub().en
//   // const isReallyAnyShowSubtitle = nextSubtitle.startTime <= videoCurrentTime
//   const isReallyAnyShowSubtitle =
//     subtitle.getLastSub().en.startTime <= videoCurrentTime

//   if (!isReallyAnyShowSubtitle) event.target.playbackRate = 1.5
//   else {
//     //set playbackRate to video play 2 words per second by subtitle
//     const timeForSubtitle = atualSubtitle.endTime - atualSubtitle.startTime
//     const wordsCount = atualSubtitle.text.split(' ').length
//     const timeForWords = timeForSubtitle / wordsCount

//     if (wordsCount < 3) event.target.playbackRate = 1.4
//     else if (timeForWords > 2) {
//       event.target.playbackRate = 0.5
//       console.log('timeForWords > 2')
//     } else if (timeForWords > 1.5) {
//       event.target.playbackRate = 0.8
//       console.log('timeForWords > 1.5')
//     } else if (timeForWords > 1) {
//       event.target.playbackRate = 1
//       console.log('timeForWords > 1')
//     } else if (timeForWords > 0.5) {
//       event.target.playbackRate = 0.8
//       console.log('timeForWords > 0.5')
//     } else if (timeForWords > 0.3) {
//       event.target.playbackRate = 0.7
//       console.log('timeForWords > 0.3')
//     } else if (timeForWords > 0.2) {
//       event.target.playbackRate = 0.8
//       console.log('timeForWords > 0.2')
//     } else if (timeForWords > 0.1) {
//       event.target.playbackRate = 0.7
//       console.log('timeForWords > 0.1')
//     }
//   }
// }

// // obs('subtitle').on('sentence-sub-end', dynamicallyVelocity)

// //on time update video
// document
//   .querySelector('video')
//   .addEventListener('timeupdate', dynamicallyVelocity)
