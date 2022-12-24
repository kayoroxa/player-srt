const fs = require('fs')

function findFile(fileName, foldersMovies) {
  for (let mainFolder of foldersMovies) {
    try {
      const folderMovie = fs
        .readdirSync(mainFolder)
        .filter(fileName => !fileName.startsWith('.'))
        .find(file => file.toLowerCase().includes(fileName.toLowerCase()))

      if (folderMovie) return mainFolder + '/' + folderMovie
    } catch (error) {
      console.log('erro')
    }
  }

  throw new Error(`Not founded your folder movie: ${fileName}`)
}

module.exports = findFile
