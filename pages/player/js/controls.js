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
  } else if (e.key.toLowerCase() === '.') {
    obs('CONTROL').notify('most-fast-next')
  } else if (e.key.toLowerCase() === ',') {
    obs('CONTROL').notify('most-fast-prev')
  } else if (e.key.toLowerCase() === 'l') {
    obs('CONTROL').notify('subtitle-show-toggle')
  } else if (e.key.toLowerCase() === 'c') {
    obs('CONTROL').notify('video-config', 'control-toggle')
  } else if (e.key === ' ') {
    obs('CONTROL').notify('video-play-toggle', e)
  } else if (e.key.toLowerCase() === 'e') {
    obs('CONTROL').notify('edit-srt-toggle')
  }
  if (e.key.toLowerCase() === 'f' || e.key.toLowerCase() === '*') {
    obs('search').notify('keySearchClick', e)
  } else if (e.key === 'p' || e.key === 'P') {
    obs('search').notify('nextSearchClick', e)
  } else if (e.key === 'o' || e.key === 'O') {
    obs('search').notify('prevSearchClick', e)
  } else if (e.key.toLowerCase() === 'ç') {
    obs('CONTROL').notify('toggle-automatically-next-search')
  }
  if (e.key.toLowerCase() === 'l') {
    obs('search').notify('prevSaveClick')
  } else if (e.key.toLowerCase() === 'k') {
    obs('search').notify('nextSaveClick')
  }
  if (e.key.toLowerCase() === '2') {
    obs('CONTROL').notify('video-speed-fast')
  } else if (e.key.toLowerCase() === '1') {
    obs('CONTROL').notify('video-speed-slow')
  }

  if (e.key === 'ArrowRight') {
    obs('CONTROL').notify('video-walking-next-time')
  } else if (e.key === 'ArrowLeft') {
    obs('CONTROL').notify('video-walking-prev-time')
  }
  if (e.key.toLowerCase() === 'b') {
    obs('CONTROL').notify('saveClip')
  }
  if (e.key.toLowerCase() === 'u') {
    obs('CONTROL').notify('show-info')
  }

  if (e.key.toLowerCase() === 'h') {
    obs('CONTROL').notify('game-show-help')
  }
  if (e.key.toLowerCase() === 'j') {
    obs('CONTROL').notify('clips')
  }
  if (e.key.toLowerCase() === 'v') {
    obs('CONTROL').notify('disable-video')
  }
  if (e.key.toLowerCase() === 'i') {
    obs('CONTROL').notify('toggle-pt-en-subtitle')
  }
  if (e.key.toLowerCase() === 'k') {
    obs('CONTROL').notify('put-pt-en-subtitle')
  }
  if (e.key.toLowerCase() === 'insert') {
    obs('CONTROL').notify('check-point-set')
  }
  if (e.key.toLowerCase() === 'home') {
    obs('CONTROL').notify('check-point-back')
  }
  if (e.key.toLowerCase() === '/') {
    obs('CONTROL').notify('toggle-warning')
  }

  if (e.key.toLowerCase() === '7') {
    obs('SHIFT-SRT').notify('left-decrease')
  }
  if (e.key.toLowerCase() === '8') {
    obs('SHIFT-SRT').notify('left-increase')
  }
  if (e.key.toLowerCase() === '4') {
    obs('SHIFT-SRT').notify('right-decrease')
  }
  if (e.key.toLowerCase() === '5') {
    obs('SHIFT-SRT').notify('right-increase')
  }

  if (e.key.toLowerCase() === '+') {
    obs('SHIFT-SRT').notify('increase')
  }

  if (e.key.toLowerCase() === '-') {
    obs('SHIFT-SRT').notify('decrease')
  }
})

obs('CONTROL').on('shortcut-toggle', value => {
  if (value !== undefined) shortCutActive = value
  else shortCutActive = !shortCutActive
})
