const obs = require('../../../../utils/observer')
const Dialogs = require('dialogs')
const dialogs = Dialogs()
require('./handleKeyDown')
const notify = obs('search').notify
const on = obs('search').on
const fs = require('fs')
const pathJoin = require('path').join
const readSrt = require('../../../../utils/readSrt')
const { findVideoPath } = require('../utils')
const _ = require('lodash')

let sentencesFind
let index = -1
let myQuery

let allowAllMovie = false

function changeTime() {
  obs('warning').notify('show', {
    title: `${myQuery}`,
    message: `${index + 1}/${sentencesFind.length}`,
  })
  document.querySelector('video').currentTime = sentencesFind[index].startTime
}

function searchAllMovie({ query, exactly }) {
  index = -1
  const pathMovies = 'F:/movies/'
  const files = fs.readdirSync(pathMovies)
  let find = []

  // debugger

  files.forEach(file => {
    const path = pathJoin(pathMovies, file)
    const subtitleEn = readSrt(path)
    if (!subtitleEn) return

    const regex = new RegExp(`\\b(${query})\\b`, 'i')

    const subFind = subtitleEn.filter(sub => {
      if (exactly && sub.text.toLowerCase().match(regex)) return true
      else if (!exactly && sub.text.toLowerCase().includes(query)) return true
    })
    if (subFind.length <= 0 || !subFind) return

    find.push(
      ...subFind.map(sub => ({
        moviePath: path,
        subFind: sub,
      }))
    )
  })

  find = _.shuffle(find)
  console.log(find)

  if (index >= find.length - 1) return
  else if (index < find.length - 1) index++
  changeTimeAndVideo()

  obs('search').on('nextSearchClick', () => {
    if (index >= find.length - 1) return
    else if (index < find.length - 1) index++
    changeTimeAndVideo()
  })
  obs('search').on('prevSearchClick', () => {
    if (index <= 0) return
    else if (index > 0) index--
    changeTimeAndVideo()
  })

  function changeTimeAndVideo() {
    const mp4InFolder = findVideoPath({ pathMovie: find[index].moviePath })
    const srtInFolder = findVideoPath({
      pathMovie: find[index].moviePath,
      type: '.srt',
    })
    const ptSrtInFolder = pathJoin(find[index].moviePath, 'portuguese.srt')

    const srt = readSrt(srtInFolder)
    const ptSrt = readSrt(ptSrtInFolder) || []
    // console.log({ srt })
    obs('video').notify('srcChange', { src: mp4InFolder })
    obs('video').notify('timeChange', find[index].subFind.startTime)
    obs('subtitle').notify('change', { subEn: srt, subPt: ptSrt })
    obs('subtitle').notify('highLight', { match: query })
    obs('warning').notify('show', {
      title: `Search for ${query}`,
      message: `${index + 1}/${find.length}`,
    })
    if (!mp4InFolder)
      console.log('mp4InFolder not found', find[index].moviePath)
  }

  //   // obs('video').notify('srcChange', find[index].path)
  // })
  // obs('search').on('prevSearchClick', prevSearchClick)

  return find
}

async function handleSearch({ query, exactly }) {
  index = -1
  myQuery = query.toLowerCase()

  const sub = await obs('subtitle').notify('getData')
  const subtitlesDataEn = sub?.subtitlesDataEn

  if (!subtitlesDataEn) return
  const find = subtitlesDataEn.filter(sub => {
    const regex = new RegExp(`\\b(${query})\\b`, 'i')

    if (exactly && sub.text.match(regex)) return true
    else if (!exactly && sub.text.includes(query)) return true
  })

  sentencesFind = find.length > 0 ? find : false

  obs('subtitle').notify('highLight', { match: query })

  obs('warning').notify('show', {
    title: `Search for ${query}`,
    message: `Find: ${sentencesFind?.length > 0 ? sentencesFind.length : 0}`,
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
on('searched', searchAllMovie)
