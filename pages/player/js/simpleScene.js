const generateConnected = require('../../../utils/generateConnected')
const obs = require('../../../utils/observer')
const subtitle = require('../Subtitle')
let count = -1

function getMostFastSentences(subtitlesData) {
  const sentences = subtitlesData
    .map(sub => {
      const text = sub.text.split(/[\s|\n]/g)
      const letters = sub.text
        .split()
        .filter(letter => letter.match(/[a-zA-Z]/g))

      const lettersPerSecond = letters.length / (sub.endTime - sub.startTime)
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

function getMostConnected(subtitlesData) {
  const sentences = subtitlesData
    .map(sub => {
      const text = sub.text.split(/[\s|\n]/g)
      const { steps } = generateConnected(sub.text)

      return {
        text,
        startTime: sub.startTime,
        endTime: sub.endTime,
        wordPerSecond: steps.length,
        infos: JSON.stringify(steps),
        durationClip: Math.round(sub.endTime - sub.startTime),
      }
    })
    .filter(sub => sub.text.length > 5 && !sub.text.includes('♪'))

  const mostFastSentences = sentences.sort((a, b) => {
    return b.wordPerSecond - a.wordPerSecond
  })
  return mostFastSentences
}

// const mostFaster = getMostFastSentences(subtitle.subData.en)
const mostFaster = getMostConnected(subtitle.subData.en)

obs('CONTROL').on('most-fast-next', () => {
  if (count === -1) count = 0
  else count++
  // debugger
  //video current time to
  document.querySelector('video').currentTime = mostFaster[count].startTime

  obs('warning').notify('show', {
    title: 'Sentence Fast',
    message: `${count}/${mostFaster.length} WordssssPerSec: ${mostFaster[count].wordPerSecond} info: ${mostFaster[count].infos}`,
  })
  document.querySelector('video').play()
})

obs('CONTROL').on('most-fast-prev', () => {
  count--

  document.querySelector('video').currentTime = mostFaster[count].startTime

  obs('warning').notify('show', {
    title: 'Sentence Fast',
    message: `${count}/${mostFaster.length} WordsPsssserSec: ${mostFaster[count].wordPerSecond}`,
  })

  document.querySelector('video').play()
})
