const obs = require('../../../utils/observer')
const subtitle = require('../Subtitle')

// esquerda -

const video = document.querySelector('video')

obs('SHIFT-SRT').on('left-decrease', () => {
  subtitle.changeTimeShift(-0.06, 'left')
})

obs('SHIFT-SRT').on('left-increase', () => {
  subtitle.changeTimeShift(+0.06, 'left')
})

// direita +

obs('SHIFT-SRT').on('right-increase', () => {
  obs('repetition').notify('toggle', false)
  obs('repetition').notify('toggle', true)
  subtitle.changeTimeShift(+0.06, 'right')
})

obs('SHIFT-SRT').on('right-decrease', () => {
  obs('repetition').notify('toggle', false)
  obs('repetition').notify('toggle', true)
  subtitle.changeTimeShift(-0.06, 'right')
})

// obs('SHIFT-SRT').on('increase', () => {
//   subtitle.allShift(+0.06)
// })

// obs('SHIFT-SRT').on('decrease', () => {
//   subtitle.allShift(-0.06)
// })
