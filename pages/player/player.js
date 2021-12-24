const fs = require('fs')
const parse = require('subtitles-parser')
const pathJoin = require('path').join
const config = require('../../config-player.json')
const pathMovie = config.path

const subEn = document.querySelector('p.en')
const subPt = document.querySelector('p.pt')

let subtitlesDataEn
let subtitlesDataPt

function handleTimeUpdate(event) {
  if (!subtitlesDataEn || subtitlesDataEn.length < 2)
    return (subEn.textContent = 'sem srt')

  const currentTimeMs = event.target.currentTime
  debugger
  const currentSubtitleEn = subtitlesDataEn?.find(sub => {
    return sub.startTime <= currentTimeMs && sub.endTime >= currentTimeMs
  })

  const currentSubtitlePt = subtitlesDataPt?.find(sub => {
    return sub.startTime <= currentTimeMs && sub.endTime >= currentTimeMs
  })
  // debugger

  // console.log({ currentSubtitle, currentTimeMs })
  if (currentSubtitleEn) {
    subEn.textContent = currentSubtitleEn.text
  } else {
    subEn.textContent = ''
  }
  if (currentSubtitlePt) {
    subPt.textContent = currentSubtitlePt.text
  } else {
    subPt.textContent = ''
  }
}
//find file mp4
function findFindPath(type, containsFile = '') {
  const files = fs.readdirSync(pathMovie)
  let file
  debugger
  if (containsFile == '') {
    file = files.find(
      file =>
        file.endsWith('.' + type) &&
        !file.includes('port') &&
        !file.includes('pt')
    )
  } else {
    file = files.find(
      file => file.endsWith('.' + type) && file.includes(containsFile)
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
  const pathSrtPt = findFindPath('srt', 'pt')
  console.log({ pathSrtEn, pathSrtPt })

  if (!pathSrtEn) return

  const srtFileEn = fs.readFileSync(pathSrtEn, 'utf8')

  subtitlesDataEn = parse.fromSrt(srtFileEn, true).map(sub => ({
    ...sub,
    startTime: sub.startTime / 1000,
    endTime: sub.endTime / 1000,
  }))
  console.log({ subtitlesDataEn })

  if (!pathSrtPt) return
  const srtFilePt = fs.readFileSync(pathSrtPt, 'utf-8')

  subtitlesDataPt = parse.fromSrt(srtFilePt, true).map(sub => ({
    ...sub,
    startTime: sub.startTime / 1000,
    endTime: sub.endTime / 1000,
  }))
}

main()
document.querySelector('video').src = findFindPath('mp4')
// document.querySelector('video').addEventListener('onloadeddata', () => {
//   if (config.start) {
//     document.querySelector('video').currentTime = config.start / 1000
//   }
// })

if (config.start) {
  document.querySelector('video').currentTime = config.start
}
document.querySelector('video').src = findFindPath('mp4')
document.querySelector('video').addEventListener('timeupdate', handleTimeUpdate)
