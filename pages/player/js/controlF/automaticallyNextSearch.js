const obs = require('../../../../utils/observer')

let toggle = false
let ignoreLast = true
let tempDisabled = false
let repetition = false

obs('CONTROL').on('toggle-automatically-next-search', () => {
  toggle = !tempDisabled ? !toggle : true
  tempDisabled = false
  obs('warning').notify('show', {
    title: 'Automatically next search',
    message: toggle ? 'ON' : 'OFF',
  })
})

obs('search').on('prevSearchClick', () => {
  ignoreLast = false
})

obs('repetition').on('changed', repeating => {
  repetition = repeating
})

obs('search').on('nextSearchClick', () => {
  if (toggle) tempDisabled = false
  ignoreLast = false
})

obs('search').on('prevSearchClick', () => {
  if (toggle) tempDisabled = false
  ignoreLast = false
})

obs('CONTROL').on('subtitle-prev', () => {
  tempDisabled = true
  ignoreLast = false
})

obs('CONTROL').on('subtitle-next', () => {
  tempDisabled = true
  ignoreLast = false
})

obs('subtitle').on('sentence-sub-end', () => {
  ignoreLast = !ignoreLast
  if (!toggle || ignoreLast || tempDisabled || repetition) return
  obs('search').notify('nextSearchClick')
})
