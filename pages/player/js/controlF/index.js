const obs = require('../../../../utils/observer')
const Dialogs = require('dialogs')
const dialogs = Dialogs()
require('./handleKeyDown')
const notify = obs('search').notify
const on = obs('search').on

let sentencesFind
let index = -1
let myQuery

function changeTime() {
  obs('warning').notify('show', {
    title: `${myQuery}`,
    message: `${index + 1}/${sentencesFind.length}`,
  })
  document.querySelector('video').currentTime = sentencesFind[index].startTime
}

function handleSearch({ query, exactly }) {
  index = -1
  obs('subtitle').notify('get', ({ subtitlesDataEn }) => {
    if (!subtitlesDataEn) return
    const find = subtitlesDataEn.filter(sub => {
      ///\b($word)\b/i
      const regex = new RegExp(`\\b(${query})\\b`, 'i')
      // console.log(sub.text.match(regex))
      if (exactly && sub.text.match(regex)) return true
      else if (!exactly && sub.text.includes(query)) return true
    })
    myQuery = query.toLowerCase()
    sentencesFind = find.length > 0 ? find : false

    obs('subtitle').notify('highLight', { match: query })
  })
}

function keySearch(e) {
  e.preventDefault()
  obs('command').notify('toggle', false)

  dialogs.prompt('Search Sentence', query => {
    notify('addListeningKey')
    obs('command').notify('toggle', true)

    if (query === undefined || query === '') return
    obs('search').notify('searched', {
      query,
      exactly: e.key.toLowerCase() === 'f',
    })
    obs('warning').notify('show', {
      title: `Search for ${query}`,
      message: `Find: ${sentencesFind?.length > 0 ? sentencesFind.length : 0}`,
    })
  })
  notify('addListeningKey')
}

function nextSearchClick() {
  if (!sentencesFind) return
  if (index < sentencesFind?.length - 1) {
    index++
    changeTime()
  }
}
function prevSearchClick() {
  if (!sentencesFind) return
  if (index > 0) {
    index--
    changeTime()
  }
}

on('keySearchClick', keySearch)
on('nextSearchClick', nextSearchClick)
on('prevSearchClick', prevSearchClick)
on('searched', handleSearch)
