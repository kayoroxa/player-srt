const Dialogs = require('dialogs')
const dialogs = Dialogs()
const obs = require('../../../utils/observer')

let sentencesFind
let index = -1
let myQuery

obs('search').on('searched', ({ query }) => {
  index = -1
  obs('subtitle').notify('get', ({ subtitlesDataEn }) => {
    if (!subtitlesDataEn) return
    const find = subtitlesDataEn.filter(sub => {
      ///\b($word)\b/i
      const regex = new RegExp(`\\b(${query})\\b`, 'i')
      // console.log(sub.text.match(regex))
      if (sub.text.match(regex)) return true
    })
    myQuery = query.toLowerCase()
    sentencesFind = find.length > 0 ? find : false
  })
})

function handleKeyDown(e) {
  if (e.key === 'f' || e.key === 'F') {
    e.preventDefault()
    obs('command').notify('toggle', false)

    dialogs.prompt('Search Sentence', query => {
      document.addEventListener('keydown', handleKeyDown)
      obs('command').notify('toggle', true)

      if (query === undefined || query === '') return

      obs('search').notify('searched', { query })
      obs('warning').notify('show', {
        title: 'Search',
        message: `Searching for ${query}`,
      })
    })
    document.removeEventListener('keydown', handleKeyDown)
  }
  if (e.key === 'p' || e.key === 'P') {
    if (!sentencesFind) return
    if (index < sentencesFind.length - 1) index++
    changeTime()
  } else if (e.key === 'o' || e.key === 'O') {
    if (!sentencesFind) return
    if (index > 0) index--
    changeTime()
  }
}

function changeTime() {
  obs('warning').notify('show', {
    title: `${myQuery}`,
    message: `${index + 1}/${sentencesFind.length}`,
  })
  document.querySelector('video').currentTime = sentencesFind[index].startTime
}

document.addEventListener('keydown', handleKeyDown)
