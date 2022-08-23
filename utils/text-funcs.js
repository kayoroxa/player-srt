/* eslint-disable no-useless-escape */
const { teaches } = require('../config-player')
const obs = require('./observer')
const colors = require('../config-colors')
const keysToSpanStringColors = require('./keyToSpan')

const isExemple = false

let joinTeaches = teaches

obs('subtitle').on('highLight', ({ match }) => {
  joinTeaches = teaches
  if (!match) return
  if (!joinTeaches.includes(match)) {
    joinTeaches.push(match)
  }
})

function portugueseColor(text) {
  const innerText = teaches.reduce((acc, teach) => {
    if (teach.length < 1) return acc
    acc = acc.replace(/havia/i, 'existia')
    acc = acc.replace(/houve/i, 'existiu')
    acc = acc.replace(/Estarei/i, 'vou estar')
    acc = acc.replace(/serão/i, 'vão ser')
    acc = acc.replace(/estaremos/i, 'vamos estar')
    acc = acc.replace(/ficará/i, 'vai ficar')
    acc = acc.replace(/seria/i, 'iria ficar')
    acc = acc.replace(/será/i, 'vai ser')
    acc = acc.replace(/ficaria/i, 'iria ficar')
    acc = acc.replace(/estaríamos/i, 'iria estar')
    acc = acc.replace(/estou/i, 'eu estou')
    acc = acc.replace(/estará/i, 'vai estar')
    acc = acc.replace(/passamos /i, 'temos passado')
    acc = acc.replace(/estive/i, 'tenho estado')
    acc = acc.replace(/foi/i, 'tem sido')
    acc = acc.replace(/estou/i, 'tenho estado')
    acc = acc.replace(/estamos/i, 'temos estado')
    acc = acc.replace(/Há/i, 'existe')
    acc = acc.replace(/vamos/i, 'nós vamos')

    return acc.replace(
      // /(sido|estado)/gi,
      // /(existe|existem)/gi,
      /(vai|vamos|vão|vou)/gi,
      // /(existia|existiam|existiu)/gi,
      // /(est\S+|\bé\b|ser|era|estava|foi|fosse|estar|sou|ficar|ser)/gi,
      `<span class="teach">$1</span>`
    )
  }, text)
  return isExemple ? innerText : text
}
//sort by size word
const allWords2 = require('../utils/allWords2.json')
  .slice(0, 500)
  .sort((a, b) => b.word.length - a.word.length)

const hightLightMostUsed = false

function colorTeach(text, op) {
  if (!op?.pt && hightLightMostUsed) {
    // return text
    return allWords2.reduce((acc, cur) => {
      // match all words in text span
      const regex = new RegExp(`(?<!\\w)(${cur.word})(?!\\w)`, 'gi')
      return acc.replace(regex, `<span class="color-text">$1</span>`)
    }, text)
  }

  const innerText = teaches.reduce((acc, teach) => {
    if (teach.length < 1) return acc
    const re = new RegExp(teach, 'gi')
    const match = text.match(re)

    const regex = isExemple ? teach : `(?<!\\w)(${teach})(?!\\w)`
    return acc.replace(new RegExp(regex, 'gi'), `<span class="teach">$1</span>`)
  }, text)

  return innerText
}

function genericsColors(text) {
  const innerText = colors.reduce((acc, color) => {
    const regex = new RegExp(color.query, 'gi')
    if (regex.test(text)) {
      const hasGroup = regex.exec(text)[1]
    }
    function replace() {
      if (color.type === 'code') {
        return acc.replace(
          regex,
          `<span class="off" style="-webkit-text-stroke: 1px ${color.color}; text-shadow: 2px 2px 0px ${color.color}; color: white">${find}</span>`
        )
      } else {
        return acc.replace(
          regex,
          `<span class="off" style="color: ${color.color}; text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.6);">${find}</span>`
        )
      }
    }
  }, text)
  return innerText
}

function innerTxtSplittedByKeys(text) {
  return keysToSpanStringColors(text).replace(/[{}]/g, '')
}

function textToInner(text, op) {
  if (text.length > 72) {
    text = text.replace(/\n/g, '<br>')
  } else {
    text = text.replace(/\n/g, ' ')
  }
  if (op?.highLight !== false) text = colorTeach(text, { pt: op?.portuguese })
  // if (op?.portuguese === true)
  text = innerTxtSplittedByKeys(text)
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
    .replace(/\,(?=\S)/gim, ', ')
    .trim()
}

module.exports = {
  textToInner,
  sanitizer,
}
