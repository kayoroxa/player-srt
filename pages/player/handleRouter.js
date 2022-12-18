const route = require('../../utils/router')

function goHome() {
  route.goTo('library')
}

document.addEventListener('keydown', function (e) {
  if (e.key.toLowerCase() === '/') {
    // goHome()
    // route.goTo('F:/MAIN/JOB/CHANNEL/powerVideo/src/pages/home.html', true)
  }
})
