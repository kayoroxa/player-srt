const parser = require('subtitles-parser')
const fs = require('fs')
const { sanitizer } = require('./text-funcs')

function readSrt(path, options) {
  if (!fs.existsSync(path)) return [] // throw new Error('File not found')
  if (!path.endsWith('.srt')) {
    let allFiles
    try {
      allFiles = fs.readdirSync(path)
    } catch (error) {
      return false
    }
    const havePt = v => v.includes('pt') || v.includes('port')
    const srtFiles = allFiles.filter(
      v => v.endsWith('.srt') && (options?.pt ? havePt(v) : !havePt(v))
    )
    if (srtFiles.length === 0) return false
    if (srtFiles.length > 1) return false
    // if (srtFiles.length === 0) throw new Error(`No srt file found ${path}`)
    // if (srtFiles.length > 1) throw new Error('More than one srt file found')
    path = `${path}/${srtFiles[0]}`
  }
  const srt = fs.readFileSync(path, 'utf8')
  const subtitles = parser.fromSrt(srt, true)
  return subtitles
    .map(v => ({
      ...v,
      raw: v.text,
      text: sanitizer(v.text),
      startTime: options?.ms ? v.startTime : v.startTime / 1000,
      endTime: options?.ms ? v.endTime : v.endTime / 1000,
    }))
    .filter(v => v.text.length > 0)
}

module.exports = readSrt
