require('./changeTimeAndVideo')
require('./automaticallyNextSearch')
const obs = require('../../../../utils/observer')
const Dialogs = require('dialogs')
const dialogs = Dialogs()
const notify = obs('search').notify
const on = obs('search').on
const searchAllMovie = require('./searchAllMovie')

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

function keySearch(e) {
  e.preventDefault()
  // obs('command').notify('toggle', false)
  obs('CONTROL').notify('shortcut-toggle', false)

  dialogs.prompt('Search Sentence', query => {
    notify('addListeningKey')
    obs('CONTROL').notify('shortcut-toggle', true)

    if (query === undefined || query === '') return
    obs('search').notify('searched', {
      query: queryConvert(query),
      exactly: e.key.toLowerCase() === 'f',
      sameMovie: query.includes(';'),
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

function queryConvert(textQuery) {
  let newQuery = textQuery
  if (textQuery.includes('&&')) {
    newQuery =
      newQuery
        .split(/&&/g)
        .map(v => `(?=.*\\b${v}\\b)`)
        .join('') + '.*'
  }
  return newQuery.replace(/;/g, '').trim()
}
on('keySearchClick', keySearch)
on('nextSearchClick', nextSearchClick)
on('prevSearchClick', prevSearchClick)
on('searched', searchAllMovie)
