const obs = require('../../../utils/observer')
let editable = false
let editing = false

obs('CONTROL').on('edit-srt-toggle', () => {
  obs('warning').notify('show', {
    title: `Editable ${editable}`,
  })
  editable = !editable

  const subtitleElement = document.querySelector('.subtitles')

  //loop all children
  for (let i = 0; i < subtitleElement.children.length; i++) {
    const child = subtitleElement.children[i]
    child.setAttribute('contenteditable', editable)
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

obs('EDIT_SRT').on('editing', elem => {
  obs('CONTROL').notify('shortcut-toggle', false)
  document.addEventListener(
    'keydown',
    e => {
      if (e.key === 'Enter' && editing) {
        e.preventDefault()
        obs('EDIT_SRT').notify('text-changed', elem)
        elem.blur()
        editing = false
      }
      if (e.key === 'Escape' && editing) {
        e.preventDefault()
        elem.blur()
        editing = false
      }
    }
    // { once: true }
  )
})

obs('EDIT_SRT').on('text-changed', elem => {
  obs('warning').notify('show', {
    title: `Text changed ${elem.innerText}`,
  })
})
