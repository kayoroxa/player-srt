function getMostFastSentences(subtitlesData) {
  const sentences = subtitlesData.map(sub => {
    const text = sub.text.split(/[\s|\n]/g)
    const wordPerSecond = text.length / (sub.endTime - sub.startTime)
    return {
      text,
      startTime: sub.startTime,
      endTime: sub.endTime,
      wordPerSecond,
      durationClip: Math.round(sub.endTime - sub.startTime),
    }
  })
  const mostFastSentences = sentences.sort((a, b) => {
    return b.wordPerSecond - a.wordPerSecond
  })
  return mostFastSentences
}

obs('subtitle').on('loaded', sub => {
  const result = getMostFastSentences(sub.en)
  console.log(result)
  obs('player').notify('searchSentence', { query: 'mostFastSentence', result })
})
