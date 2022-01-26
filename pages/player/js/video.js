const obs = require('../../../utils/observer')

obs('video').on('srcChange', ({ src }) => {
  document.querySelector('video').src = src
  // const lastVideo = document.querySelector('video:last-child')
  // lastVideo.muted = true

  // const newVideo = lastVideo.cloneNode(true)
  // newVideo.src = src
  // newVideo.classList.add('hide')

  // // //add new video
  // document.querySelector('.player').appendChild(newVideo)

  // // //when video loaded
  // //when video play
  // // newVideo.onplay = () => {
  // newVideo.onplay = me => {
  //   console.log('loadedmetadata')
  //   // obs('video').on('newVideoCanShow', () => {
  //   me.target.classList.remove('hide')

  //   setTimeout(() => {
  //     lastVideo.remove()
  //   }, 200)
  //   // })
  // }
})

obs('video').on('timeChange', time => {
  //get last video element children
  document.querySelector('video:last-child').currentTime = time

  // obs('video').notify('newVideoCanShow')
})