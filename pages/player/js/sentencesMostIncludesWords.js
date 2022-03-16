const obs = require('../../../utils/observer')
const subtitle = require('../Subtitle')
let count = -1

let sentences = []
sentences = getMostIncludesSentences(subtitle.subData.en)

function getMostIncludesSentences(subtitlesData) {
  const sentences = subtitlesData
    .map(sub => {
      const text = sub.text.split(/[\s|\n]/g)
      const lettersPerSecond =
        sub.text.split().filter(v => v.match(/[a-zA-Z]/g)).length /
        (sub.endTime - sub.startTime)
      const wordPerSecond = text.length / (sub.endTime - sub.startTime)
      return {
        text,
        startTime: sub.startTime,
        endTime: sub.endTime,
        wordPerSecond: Math.round(wordPerSecond),
        lettersPerSecond: Math.round(lettersPerSecond),
        durationClip: Math.round(sub.endTime - sub.startTime),
      }
    })
    .filter(sub => sub.text.length > 10 && !sub.text.includes('♪'))
  const mostFastSentences = sentences.sort((a, b) => {
    return b.wordPerSecond - a.wordPerSecond
  })
  return mostFastSentences
}

obs('CONTROL').notify('most-includes-next', () => {
  if (sentences.length <= 0) {
    obs('warning').notify('show', {
      title: 'Sentence most includes',
      message: 'No sentences found or in loading',
    })
    return
  } else {
    if (count === -1) count = 0
    else count++

    document.querySelector('video').currentTime = sentences[count].startTime

    obs('warning').notify('show', {
      title: 'Sentence Includes',
      message: `${count}/${sentences.length}}`,
    })
    document.querySelector('video').play()
  }
})

obs('CONTROL').notify('most-includes-prev', () => {
  if (sentences.length <= 0) {
    obs('warning').notify('show', {
      title: 'Sentence most includes',
      message: 'No sentences found or in loading',
    })
    return
  } else {
    count--

    document.querySelector('video').currentTime = sentences[count].startTime

    obs('warning').notify('show', {
      title: 'Sentence Includes',
      message: `${count}/${sentences.length}}`,
    })
    document.querySelector('video').play()
  }
})
