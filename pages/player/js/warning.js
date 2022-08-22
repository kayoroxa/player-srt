const obs = require('../../../utils/observer')

const warningElement = document.getElementById('warning')
let myTimeout

let active = true

function show(data) {
  clearTimeout(myTimeout)
  const title = data?.title ? data?.title : ''
  const message = data?.message ? data?.message : ''

  warningElement.innerHTML = `<h3>${title}</h3><p>${message}</p>`

  warningElement.classList.add('show')
  warningElement.style.opacity = 1

  myTimeout = setTimeout(() => {
    warningElement.style.opacity = 0
    setTimeout(() => {
      warningElement.classList.remove('show')
    }, 300)
  }, 3000)
}

obs('CONTROL').on('toggle-warning', () => {
  active = !active
  show({
    title: 'Warning' + (active ? '✅' : '⛔'),
    message: 'Is' + (active ? '' : ' not') + ' active',
  })
})

obs('warning').on('show', data => {
  if (!active) return
  show(data)
})
