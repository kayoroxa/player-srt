const obs = require('../../../utils/observer')

obs('video').on('srcChange', ({ src }) => {
  const video = document.querySelector('video')
  video.src = src
  video.autoplay = true
  // video.controls = false

  // document.querySelector('.hover').addEventListener(
  //   'mouseover',
  //   () => {
  //     video.controls = true
  //   },
  //   false
  // )
  // document.querySelector('.hover').addEventListener(
  //   'mouseout',
  //   () => {
  //     video.controls = false
  //   },
  //   false
  // )
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

document.querySelector('video').addEventListener('focus', () => {
  document.querySelector('video').blur()
})

obs('subtitle').on('changeIndex', lastSubtitle => {
  document.querySelector('video').currentTime = lastSubtitle.en.startTime
})

let toggleVideo = true

obs('CONTROL').on('disable-video', () => {
  toggleVideo = !toggleVideo
  document.querySelector('video').style.opacity = toggleVideo ? 1 : 0
  document.querySelector('.video-gradient').style.opacity = toggleVideo ? 1 : 0
})
