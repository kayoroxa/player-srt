const obs = require('../../../utils/observer')
const subtitle = require('../Subtitle')

let infos = {}

function showInfo() {
  console.log('showInfo')
  infos = {
    wordsUniq: new Set(
      subtitle.subData.en
        .map(sub => sub.text)
        .join(' ')
        .toLowerCase()
        .match(/[’'a-zA-Z]+/gi)
    ).size,
    lenWords: subtitle.subData.en
      .map(sub => sub.text.split(' ').length)
      .reduce((a, b) => a + b, 0),
  }
  obs('warning').notify('show', {
    title: 'info',
    message: JSON.stringify(infos, null, 2),
  })
}

obs('CONTROL').on('show-info', showInfo)
