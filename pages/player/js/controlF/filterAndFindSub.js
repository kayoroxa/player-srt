const readSrt = require('../../../../utils/readSrt')
const pathJoin = require('path').join
const configPlayer = require('../../../../config-player')
const fs = require('fs')
const subtitle = require('../../Subtitle')

function finderSrtAllMovies({ query, exactly, sameMovie }) {
  const pathsMovies = configPlayer.foldersMovies

  let find = []

  pathsMovies.forEach(pathMovies => {
    let files = []

    if (!fs.existsSync(pathMovies)) {
      return false
    }

    if (sameMovie) files = [subtitle.infoPath.folder.replace(/.*\//g, '')]
    else files = fs.readdirSync(pathMovies) || false

    files.forEach(file => {
      const path = pathJoin(pathMovies, file)
      const subtitleEn = readSrt(path)
      if (!subtitleEn) return
      // const isQueryRegex = query[0] === '*'

      query = query.replace(/__*/g, '_')
      query = query.replace(/_/g, '.*')
      const regex = new RegExp(`(?<=\\s|^)(${query})(?=\\s|$)`, 'ig')
      const regexGeral = new RegExp(`(${query})`, 'ig')

      const subFind = subtitleEn.filter(sub => {
        if (exactly && sub.text.toLowerCase().match(regex)) return true
        else if (!exactly && sub.text.toLowerCase().match(regexGeral))
          return true
      })
      if (subFind.length <= 0 || !subFind) return

      find.push(
        ...subFind.map(sub => ({
          moviePath: path,
          subFind: sub,
        }))
      )
    })
  })
  return find
}

module.exports = finderSrtAllMovies
