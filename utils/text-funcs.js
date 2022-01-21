const { teaches } = require('../config-player')
const obs = require('./observer')

let joinTeaches = teaches

obs('subtitle').on('highLight', ({ match }) => {
  joinTeaches = teaches
  if (!match) return
  if (!joinTeaches.includes(match)) {
    joinTeaches.push(match)
  }
})

function colorTeach(text) {
  const innerText = teaches.reduce((acc, teach) => {
    if (teach.length < 1) return acc
    return acc.replace(
      new RegExp(teach, 'gi'),
      `<span class="teach">${teach}</span>`
    )
  }, text)

  return innerText
}

function textToInner(text) {
  if (text.length > 72) {
    text = text.replace(/\n/g, '<br>')
  } else {
    text = text.replace(/\n/g, ' ')
  }
  text = colorTeach(text)
  return text
}

function sanitizer(text) {
  return text
    .replace(/<.*>/g, '')
    .replace(/\(.*\)/g, '')
    .replace(/\[.*\]/g, '')
    .replace(/-/g, '')
    .replace(/\s\s+/g, ' ')
    .replace(/^.*?:/g, '')
    .trim()
}

module.exports = {
  textToInner,
  sanitizer,
}
