const obs = require('../../../../utils/observer')
const _ = require('lodash')
const finderSrtAllMovies = require('./filterAndFindSub')

function searchAllMovie({ query, exactly }) {
  // let index = await obs('search').notify('getIndex')
  let index = 0
  index = -1
  // if (!config.folderMovies) {
  //   obs('warning').notify('show', {
  //     title: 'Não foi possível encontrar o diretório de filmes',
  //     message: 'Verifique se o diretório de filmes está correto',
  //   })
  // }

  //check if existe a dir fs

  let find = finderSrtAllMovies({ query, exactly })

  find = _.shuffle(find)

  if (index >= find.length - 1) return
  else if (index < find.length - 1) index++
  obs('search').notify('changeTimeAndVideo', { exactly, query, index, find })

  obs('search').on('nextSearchClick', () => {
    if (index >= find.length - 1) return
    else if (index < find.length - 1) index++
    obs('search').notify('changeTimeAndVideo', { exactly, query, index, find })
  })
  obs('search').on('prevSearchClick', () => {
    if (index <= 0) return
    else if (index > 0) index--
    obs('search').notify('changeTimeAndVideo', { exactly, query, index, find })
  })

  //   // obs('video').notify('srcChange', find[index].path)
  // })
  // obs('search').on('prevSearchClick', prevSearchClick)

  return find
}

module.exports = searchAllMovie
