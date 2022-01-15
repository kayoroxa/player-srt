// const obs = require('../../utils/observer')

const data = {}
let count = -1

function handleSearch(_data) {
  data[_data.query] = _data.result
}

function searchSentence() {
  obs('player').on('searchSentence', handleSearch)
  handleKeyDown()
}

function handleKeyDown() {
  document.addEventListener('keydown', e => {
    if (e.key === '.') {
      if (count === -1) count = 0
      else count++

      //video current time to
      document.querySelector('video').currentTime =
        data['mostFastSentence'][count].startTime

      obs('warning').notify('show', {
        title: 'Sentence Fast',
        message: `${count}/${data['mostFastSentence'].length} WordsPerSec: ${data['mostFastSentence'][count].wordPerSecond}`,
      })
      document.querySelector('video').play()
    }

    if (e.key === ',') {
      count--

      document.querySelector('video').currentTime =
        data['mostFastSentence'][count].startTime

      obs('warning').notify('show', {
        title: 'Sentence Fast',
        message: `${count}/${data['mostFastSentence'].length} WordsPerSec: ${data['mostFastSentence'][count].wordPerSecond}`,
      })

      document.querySelector('video').play()
    }
  })
}

searchSentence()
