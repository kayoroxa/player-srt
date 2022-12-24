const generateConnected = require('../../../utils/generateConnected')
const obs = require('../../../utils/observer')
const subtitle = require('../Subtitle')
let count = -1

function getMostFastSentences(subtitlesData) {
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

const stringSimilarity = require('string-similarity')

function getMostConnected(subtitlesData) {
  const sentences = subtitlesData
    .map(sub => {
      const text = sub.text.split(/[\s|\n]/g)
      const sentence = sub.text.replace(/\{|\}/g, '')
      const { steps } = generateConnected(sentence)
      const result = steps.slice(-1)[0]

      const _return = {
        text,
        startTime: sub.startTime,
        endTime: sub.endTime,
        wordPerSecond: false,
        infos: JSON.stringify(result),
        durationClip: Math.round(sub.endTime - sub.startTime),
      }

      if (result) {
        const similarityPercent = stringSimilarity.compareTwoStrings(
          sentence,
          result
        )

        // _return.wordPerSecond = similarityPercent
        _return.wordPerSecond = result.split('').filter(l => l === '-').length
      }
      return _return
    })
    .filter(
      sub =>
        // sub.text.length > 10 &&
        !sub.text.includes('♪') && sub.wordPerSecond !== false
    )

  const mostFastSentences = sentences.sort((a, b) => {
    return a.wordPerSecond - b.wordPerSecond
  })
  return mostFastSentences.reverse()
}

// const mostFaster = getMostFastSentences(subtitle.subData.en)
const mostFaster = getMostConnected(subtitle.subData.en)

obs('CONTROL').on('most-fast-next', () => {
  if (count === -1) count = 0
  else count++
  // debugger
  //video current time to
  document.querySelector('video').currentTime = mostFaster[count].startTime

  console.log(mostFaster[count].infos)

  obs('warning').notify('show', {
    title: 'Sentence Fast',
    message: `${count}/${mostFaster.length} WordsPerSec: ${mostFaster[count].wordPerSecond} infos: ${mostFaster[count].infos}`,
    duration: true,
  })
  document.querySelector('video').play()
})

obs('CONTROL').on('most-fast-prev', () => {
  count--

  document.querySelector('video').currentTime = mostFaster[count].startTime

  obs('warning').notify('show', {
    title: 'Sentence Fast',
    message: `${count}/${mostFaster.length} WordsPerSec: ${mostFaster[count].wordPerSecond} infos: ${mostFaster[count].infos}`,
    duration: true,
  })

  document.querySelector('video').play()
})
