const fs = require('fs')
const parser = require('subtitles-parser')

function folderAnalyse(folderPath, option) {
  let files = fs.readdirSync(folderPath)

  if (typeof option?.filterExt === 'string') {
    files = files.filter(file => file.endsWith(option.filterExt))
  }

  if (typeof option?.includeName === 'string') {
    files = files.filter(file => file.includes(option.includeName))
  }

  if (typeof option?.notIncludeName === 'string') {
    files = files.filter(file => !file.includes(option.notIncludeName))
  }

  if (option?.withPath === true) {
    return files.map(file => `${folderPath}/${file}`)
  }
  return files
}

function readFiles(files) {
  const dataFiles = files.map(file => {
    const strFile = fs.readFileSync(file, { encoding: 'utf8' })
    if (file.endsWith('.srt')) {
      return parser.fromSrt(strFile)
    } else if (file.endsWith('.json')) {
      return JSON.parse(strFile)
    }
    return strFile
  })
  return dataFiles
}

function main(folderPath, options) {
  const filesPath = folderAnalyse(folderPath, { ...options, withPath: true })
  if (options?.readMode === true) {
    const dataFiles = readFiles(filesPath)
    return dataFiles
  }
  return filesPath
}

module.exports = main

// const textSplitted = text.split(/[\.|\?|\!|\,]/i).filter(t => t.length > 0)
// if (textSplitted.length === 0) return false
