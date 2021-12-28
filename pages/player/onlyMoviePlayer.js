const fs = require('fs')
const pathJoin = require('path').join
const config = require('../../config-player')
const pathMovie = config.path
const { textToInner } = require('../../utils/text-funcs')
const readSrt = require('../../utils/readSrt')
const subEn = document.querySelector('p.en')
const subPt = document.querySelector('p.pt')
const convertTimeStr = require('../../utils/convertHHMMSS')

function onlyMoviePlayer() {
  console.log(indexSub, 'oii')
  function handleTimeUpdate(event) {
    if (!subtitlesDataEn || subtitlesDataEn.length < 2)
      return (subEn.textContent = 'sem srt')

    const currentTimeMs = event.target.currentTime

    const currentSubtitleEn = subtitlesDataEn?.find(sub => {
      return sub.startTime <= currentTimeMs && sub.endTime >= currentTimeMs
    })

    const currentSubtitlePt = subtitlesDataPt?.find(sub => {
      return sub.startTime <= currentTimeMs && sub.endTime >= currentTimeMs
    })

    lastSubtitleEn = currentSubtitleEn || lastSubtitleEn
    // debugger

    //get index of subtitle more closer to current time
    indexSub = subtitlesDataEn.reduce((acc, sub, i) => {
      if (sub.startTime <= currentTimeMs && sub.endTime >= currentTimeMs) {
        return i
      } else if (sub.startTime <= currentTimeMs) return i + 1
      return acc
    }, -1)

    // console.log({ currentSubtitle, currentTimeMs })
    if (currentSubtitleEn) {
      subEn.innerHTML = textToInner(currentSubtitleEn.text)
    } else {
      subEn.innerHTML = ''
    }
    if (currentSubtitlePt) {
      subPt.innerHTML = textToInner(currentSubtitlePt.text)
    } else {
      subPt.innerHTML = ''
    }
  }
  //find file mp4
  function findFindPath(type, options) {
    const files = fs.readdirSync(pathMovie)
    let file
    if (!options?.pt) {
      file = files.find(
        file =>
          file.endsWith('.' + type) &&
          !file.includes('port') &&
          !file.includes('pt')
      )
    } else {
      file = files.find(
        file =>
          file.endsWith('.' + type) &&
          (file.includes('port') || file.includes('pt'))
      )
    }
    if (!file) {
      return
    } else {
      return pathJoin(pathMovie, file)
    }
  }

  async function main() {
    const pathSrtEn = findFindPath('srt')
    const pathSrtPt = findFindPath('srt', { pt: true })

    if (!pathSrtEn) return

    subtitlesDataEn = readSrt(pathSrtEn)

    if (!pathSrtPt) return

    subtitlesDataPt = readSrt(pathSrtPt)
  }

  main()
  document.querySelector('video').src = findFindPath('mp4')
  // document.querySelector('video').addEventListener('onloadeddata', () => {
  //   if (config.start) {
  //     document.querySelector('video').currentTime = config.start / 1000
  //   }
  // })

  if (config.start) {
    document.querySelector('video').currentTime = convertTimeStr(config.start)
  }
  document.querySelector('video').src = findFindPath('mp4')
  document
    .querySelector('video')
    .addEventListener('timeupdate', handleTimeUpdate)

  return {
    subtitlesDataEn,
    subtitlesDataPt,
    indexSub,
    lastSubtitleEn,
  }
}

module.exports = onlyMoviePlayer
