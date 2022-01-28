const configPlayer = require('../../../../config-player')
const obs = require('../../../../utils/observer')
const readSrt = require('../../../../utils/readSrt')
const { findVideoPath } = require('../utils')
const fs = require('fs')
const pathJoin = require('path').join
const _ = require('lodash')

function searchAllMovie({ query, exactly }) {
  // let index = await obs('search').notify('getIndex')
  let index = 0
  index = -1
  // if (!config.folderMovies) {
  //   obs('warning').notify('show', {
  //     title: 'Não foi possível encontrar o diretório de filmes',
  //     message: 'Verifique se o diretório de filmes está correto',
  //   })
  // }
  const pathMovies = configPlayer.folderMovies
  //check if existe a dir fs
  if (!fs.existsSync(pathMovies)) {
    obs('warning').notify('show', {
      title: 'Não foi possível encontrar o diretório de filmes',
      message:
        'Verifique se o "folderMovies" está correto no "config-player.js"',
    })
    return
  }
  const files = fs.readdirSync(pathMovies) || false

  let find = []

  // debugger

  files.forEach(file => {
    const path = pathJoin(pathMovies, file)
    const subtitleEn = readSrt(path)
    if (!subtitleEn) return
    // const isQueryRegex = query[0] === '*'

    query = query.replace(/__*/g, '_')
    query = query.replace(/_/g, '.*')
    const regex = new RegExp(`\\b(${query})\\b`, 'ig')
    const regexGeral = new RegExp(`(${query})`, 'ig')

    const subFind = subtitleEn.filter(sub => {
      if (exactly && sub.text.toLowerCase().match(regex)) return true
      else if (!exactly && sub.text.toLowerCase().match(regexGeral)) return true
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
    obs('subtitle').notify('highLight', {
      match: exactly ? `\\b(${query})\\b` : `(${query})`,
    })
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

module.exports = searchAllMovie
