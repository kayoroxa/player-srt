const Dialogs = require('dialogs')
const dialogs = Dialogs()
const obs = require('../../../utils/observer')

function handleKeyDown(e) {
  if (e.key === 'f' || e.key === 'F') {
    e.preventDefault()
    obs('command').notify('toggle', false)

    dialogs.prompt('Search Sentence', query => {
      document.addEventListener('keydown', handleKeyDown)
      obs('command').notify('toggle', true)

      if (query === undefined || query === '') return

      obs('search').notify('searched', '', { query })
      obs('warning').notify('show', {
        title: 'Search',
        message: `Searching for ${query}`,
      })
    })
  }
  document.removeEventListener('keydown', handleKeyDown)
}

document.addEventListener('keydown', handleKeyDown)
