const obs = require('../../../../utils/observer')

function handleKeyDown(e) {
  if (e.key.toLowerCase() === 'f' || e.key.toLowerCase() === '*') {
    obs('search').notify('keySearchClick', e)
  }
  if (e.key === 'p' || e.key === 'P') {
    obs('search').notify('nextSearchClick', e)
  } else if (e.key === 'o' || e.key === 'O') {
    obs('search').notify('prevSearchClick', e)
  }
}

document.addEventListener('keydown', handleKeyDown)

obs('search').on('addListeningKey', () => {
  document.addEventListener('keydown', handleKeyDown)
})
