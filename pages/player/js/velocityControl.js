let currentVelocity = 1

document.addEventListener('keydown', e => {
  if (e.key === '2') {
    currentVelocity += 0.1
    if (currentVelocity > 4) currentVelocity = 4
    document.querySelector('video').playbackRate = currentVelocity

    obs('warning').notify('show', {
      title: 'Velocity',
      message: Math.round(currentVelocity * 10) / 10,
    })
  } else if (e.key === '1') {
    currentVelocity -= 0.1
    if (currentVelocity < 0.1) currentVelocity = 0.1
    document.querySelector('video').playbackRate = currentVelocity

    obs('warning').notify('show', {
      title: 'Velocity',
      message: Math.round(currentVelocity * 10) / 10,
    })
  }
})
