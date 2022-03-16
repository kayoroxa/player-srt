// const obs = require('../../../utils/observer')
// const subtitle = require('../Subtitle')

// let maxRepeat = 3
// let countRepeat = 0
// let ignoreLast = false

// obs('CONTROL').notify('subtitle-show-toggle', false)

// function repeatSentenceShowSubtitle() {
//   obs('warning').notify('show', {
//     title: 'Repeat Sentence',
//   })
//   obs('CONTROL').notify('subtitle-show-toggle', true)
//   subtitle.changeIndexSub(prev => prev - 1, true)
//   obs('subtitle').on('sentence-sub-end', () => {
//     ignoreLast = !ignoreLast
//     if (ignoreLast) return
//     obs('CONTROL').notify('subtitle-show-toggle', false)
//   })
// }

// obs('CONTROL').on('game-show-help', repeatSentenceShowSubtitle)
