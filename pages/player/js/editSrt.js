const obs = require('../../../utils/observer')
const subtitle = require('../Subtitle')
let editable = false
let editing = false

obs('CONTROL').on('edit-srt-toggle', () => {
  obs('EDIT_SRT').notify('toggle-editable', !editable)

  const subtitleElement = document.querySelector('.subtitles')

  //loop all children
  for (let i = 0; i < subtitleElement.children.length; i++) {
    const child = subtitleElement.children[i]

    // on select
    child.addEventListener('focus', e => {
      obs('EDIT_SRT').notify('editing', e.target)
      editing = true
    })
    // on blur
    child.addEventListener('blur', () => {
      obs('CONTROL').notify('shortcut-toggle', true)
    })
  }
})

obs('EDIT_SRT').on('toggle-editable', toggle => {
  editable = toggle
  obs('warning').notify('show', {
    title: `Editable ${editable}`,
  })
  const subtitleElement = document.querySelector('.subtitles')
  for (let i = 0; i < subtitleElement.children.length; i++) {
    const child = subtitleElement.children[i]
    child.setAttribute('contenteditable', editable)
  }
})

obs('EDIT_SRT').on('editing', elem => {
  obs('EDIT_SRT').notify('toggle-editing', true)
  obs('CONTROL').notify('shortcut-toggle', false)
  const listener = e => {
    if (e.key === 'Enter' && editing) {
      e.preventDefault()
      obs('EDIT_SRT').notify('text-changed', {
        elem,
      })
      elem.blur()
      obs('EDIT_SRT').notify('toggle-editable', false)
    }
    if (e.key === 'Escape' && editing) {
      e.preventDefault()
      elem.blur()
      obs('EDIT_SRT').notify('toggle-editable', false)
    }
  }
  document.addEventListener(
    'keydown',
    listener
    // { once: true }
  )
  elem.addEventListener('blur', () => {
    document.removeEventListener('keydown', listener)
  })
})

obs('EDIT_SRT').on('text-changed', ({ elem }) => {
  subtitle.writeSrt(({ prev, index }) => {
    console.log('id', elem.id)
    console.log('index', index)
    return prev.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          text: elem.innerText,
        }
      }
      return item
    })
  }, elem.id)
})
