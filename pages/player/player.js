const fs = require('fs')
const pathJoin = require('path').join
const config = require('../../config-player.json')
const pathMovie = config.path
const { textToInner } = require('../../utils/text-funcs')
const readSrt = require('../../utils/readSrt')
const subEn = document.querySelector('p.en')
const subPt = document.querySelector('p.pt')
const convertTimeStr = require('../../utils/convertHHMMSS')

let subtitlesDataEn
let subtitlesDataPt

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
  // debugger

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
document.querySelector('video').addEventListener('timeupdate', handleTimeUpdate)
