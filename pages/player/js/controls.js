const obs = require('../../../utils/observer')
let shortCutActive = true

document.addEventListener('keydown', function (e) {
  if (!shortCutActive) return

  if (e.key.toLowerCase() === 'p') {
    obs('CONTROL').notify('find-next')
  } else if (e.key.toLowerCase() === 'o') {
    obs('CONTROL').notify('find-prev')
  } else if (e.key === 'PageUp') {
    obs('CONTROL').notify('scene-next')
  } else if (e.key === 'PageDown') {
    obs('CONTROL').notify('scene-prev')
  } else if (e.key.toLowerCase() === 'a') {
    obs('CONTROL').notify('subtitle-prev')
  } else if (e.key.toLowerCase() === 'd') {
    obs('CONTROL').notify('subtitle-next')
  } else if (e.key.toLowerCase() === 's') {
    obs('CONTROL').notify('subtitle-current')
  } else if (e.key.toLowerCase() === 'r') {
    obs('CONTROL').notify('subtitle-repeat-toggle')
  } else if (e.key.toLowerCase() === 'l') {
    obs('CONTROL').notify('subtitle-show-toggle')
  } else if (e.key.toLowerCase() === 'c') {
    obs('CONTROL').notify('video-config', 'control-toggle')
  } else if (e.key === ' ') {
    obs('CONTROL').notify('video-play-toggle', e)
  }
})

obs('CONTROL').on('shortcut-toggle', value => {
  if (value !== undefined) shortCutActive = value
  else shortCutActive = !shortCutActive
})
