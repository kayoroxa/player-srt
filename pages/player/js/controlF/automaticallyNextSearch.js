const obs = require('../../../../utils/observer')

let toggle = false
let ignoreLast = true

obs('CONTROL').on('toggle-automatically-next-search', () => {
  toggle = !toggle
  obs('warning').notify('show', {
    title: 'Automatically next search',
    message: toggle ? 'ON' : 'OFF',
  })
})

obs('subtitle').on('sentence-sub-end', () => {
  ignoreLast = !ignoreLast
  if (!toggle || ignoreLast) return
  obs('search').notify('nextSearchClick')
})
