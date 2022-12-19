const fs = require('fs')
const findFile = require('./utils/findFile')

const foldersMovies = ['F:/movies', 'D:/movie', 'E:/movies'] // pick your all directories main of your movies

module.exports = {
  foldersMovies: foldersMovies.filter(dir => fs.existsSync(dir)),
  times: [
    //------ Toy Story ------ //
    // ['0:4:7', '0:4:34'],
    // ['0:1:33', '0:2:1'],
  ],
  path: findFile('spider', foldersMovies), // ele vai procurar qual filme tem includes spider
  teaches: [
    //------ Toy Story ------ //
    // 'gangway',
    // 'find out',
  ],
}
