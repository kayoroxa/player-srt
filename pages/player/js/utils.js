const fs = require('fs')
const pathJoin = require('path').join

function findVideoPath(options) {
  const files = fs.readdirSync(options.pathMovie)
  let file
  let types

  if (Array.isArray(options.type)) {
    types = options.type
  } else {
    types = [options.type]
  }

  if (!options.type) types = ['.mp4', '.mkv', '.avi', '.mov']

  if (options.name) {
    file = files.find(file => file.toLowerCase() === options.name)
  }
  if (!options?.pt) {
    file = files.find(
      file =>
        types.some(type => file.toLowerCase().endsWith(type)) &&
        !file.includes('port') &&
        !file.includes('pt')
    )
  } else {
    file = files.find(
      file =>
        types.some(type => file.toLowerCase().endsWith(type)) &&
        (file.includes('port') || file.includes('pt'))
    )
  }
  if (!file) {
    return
  } else {
    return pathJoin(options.pathMovie, file)
  }
}

module.exports = {
  findVideoPath,
}
