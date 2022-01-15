function showScenes() {
  const fs = require('fs')
  const path = require('path')
  const readSrt = require('../../utils/readSrt')
  const {
    times,
    timesEnd,
    folderMovies,
    findTeach,
  } = require('../../config-player')
  const { textToInner, sanitizer } = require('../../utils/text-funcs')
  // console.log(fs.readdirSync(folderMovies))
  const movieAndSubtitleWithTeach = fs
    .readdirSync(folderMovies)
    .reduce((acc, folder) => {
      if (!fs.lstatSync(path.join(folderMovies, folder)).isDirectory())
        return acc

      const files = fs.readdirSync(path.join(folderMovies, folder))
      const engSrt = files.find(
        file => !file.includes('port') && file.endsWith('.srt')
      )
      if (!engSrt) return acc

      //filter srt who have findTeach in words
      const engSrtData = readSrt(path.join(folderMovies, folder, engSrt))
      // const ptSrtData = readSrt(path.join(folderMovies, folder, ptSrt))

      const engSrtDataFiltered = engSrtData.filter(sub =>
        typeof findTeach === 'string'
          ? sub.text.includes(findTeach)
          : findTeach(sub.text)
      )
      if (!engSrtDataFiltered.length || !engSrtDataFiltered) return acc

      return [
        ...acc,
        {
          srtWithTeach: JSON.stringify(engSrtDataFiltered),
          movieFolder: folder,
        },
      ]
    }, [])

  return movieAndSubtitleWithTeach
}
showScenes()
module.exports = showScenes
