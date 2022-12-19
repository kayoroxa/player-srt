const fs = require('fs')

function findFile(fileName, foldersMovies) {
  for (let mainFolder of foldersMovies) {
    const folderMovie = fs
      .readdirSync(mainFolder)
      .find(file => file.toLowerCase().includes(fileName.toLowerCase()))

    if (folderMovie) return mainFolder + '/' + folderMovie
  }

  throw new Error(`Not founded your folder movie: ${fileName}`)
}

module.exports = findFile
