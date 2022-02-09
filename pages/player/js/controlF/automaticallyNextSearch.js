const obs = require('../../../../utils/observer')

let toggle = false
let ignoreLast = true
let tempDisabled = false

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

obs('search').on('nextSearchClick', () => {
  if (toggle) tempDisabled = false
  ignoreLast = false
})

obs('CONTROL').on('subtitle-prev', () => {
  tempDisabled = true
  ignoreLast = false
})

obs('CONTROL').on('subtitle-next', () => {
  ignoreLast = false
})

obs('subtitle').on('sentence-sub-end', () => {
  ignoreLast = !ignoreLast
  if (!toggle || ignoreLast || tempDisabled) return
  obs('search').notify('nextSearchClick')
})
