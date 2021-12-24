const convertTimeStr = require('./convertHHMMSS')
const readSrt = require('./readSrt')
const { path } = require('../config-player.json')
const fs = require('fs')

const time = '7:10 - 8:20'

const timeSplit = time.split(' - ')

const start = convertTimeStr(timeSplit[0])
const end = convertTimeStr(timeSplit[1])

console.log(end)

const srtDataEn = readSrt(path).filter(
  v => v.startTime >= start && v.endTime <= end
)

const textSrtEn = srtDataEn.map(v => v.text)

console.log(srtDataEn)

// return

// const fileTranslation = fs.readFileSync('./pt.txt', 'utf8').split('\r\n')

// const srtPtGenerated = srtDataEn.map(v => ({
//   ...v,
//   text: fileTranslation[v.index],
// }))

// console.log(srtPtGenerated)
