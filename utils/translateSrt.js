const convertTimeStr = require('./convertHHMMSS')
const readSrt = require('./readSrt')
const parse = require('subtitles-parser')
const { path } = require('../config-player')
const pathJoin = require('path').join
const fs = require('fs')

// const time = ['0:27:12', '0:31:7']

const timeSplit = ['1:22:59', '1:24:0'] // time.split(' - ')

const start = convertTimeStr(timeSplit[0]) * 1000
const end = convertTimeStr(timeSplit[1]) * 1000

const srtDataEn = readSrt(path, { ms: true }).filter(
  v => v.startTime >= start && v.endTime <= end
)

const textSrtEn = srtDataEn
  .map(v => v.text.replace(/\n/g, ' \\n '))

  .join('\n')

// console.log(textSrtEn)
// return

const fileTranslation = fs
  .readFileSync(pathJoin(path, './portuguese.srt'), 'utf8')
  .replace(/\s\\ n\s/g, '\n')
  .replace(/\s\\n\s/g, '\n')
  .split('\r\n')

// console.log(fileTranslation)

const srtPtGenerated = srtDataEn.map((v, i) => ({
  ...v,
  text: fileTranslation[i],
}))

fs.writeFileSync(
  pathJoin(path, './portuguese.srt'),
  parse.toSrt(srtPtGenerated)
)
