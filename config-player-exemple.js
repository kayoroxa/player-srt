const fs = require('fs')

const foldersMovies = ['F:/movies', 'D:/movie', 'E:/movies'] // pick your all directories main of your movies

function findFile(fileName) {
  for (let mainFolder of foldersMovies) {
    const file = fs
      .readdirSync(mainFolder)
      .find(file => file.toLowerCase().includes(fileName))

    if (file) return mainFolder + '/' + file
  }
  return null
}

module.exports = {
  foldersMovies,
  times: [
    //------ Toy Story ------ //
    // ['0:4:7', '0:4:34'],
    // ['0:1:33', '0:2:1'],
  ],
  path: findFile('spider'), // ele vai procurar qual filme tem includes spider
  teaches: [
    //------ Toy Story ------ //
    // 'gangway',
    // 'find out',
  ],
}
