const obs = require('../../../utils/observer')

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
    .filter(sub => sub.text.length > 10)
  const mostFastSentences = sentences.sort((a, b) => {
    return b.wordPerSecond - a.wordPerSecond
  })
  return mostFastSentences
}

obs('subtitle').on('loaded', sub => {
  const result = getMostFastSentences(sub.en)
  // console.log(result)
  obs('player').notify('searchSentence', { query: 'mostFastSentence', result })
})
