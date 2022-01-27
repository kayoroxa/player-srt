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
    const re = new RegExp(teach, 'gi')
    const match = text.match(re)
    return acc.replace(
      new RegExp(teach, 'gi'),
      `<span class="teach">${match}</span>`
    )
  }, text)

  return innerText
}

function textToInner(text, op) {
  if (text.length > 72) {
    text = text.replace(/\n/g, '<br>')
  } else {
    text = text.replace(/\n/g, ' ')
  }
  if (op?.highLight !== false) text = colorTeach(text)

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
