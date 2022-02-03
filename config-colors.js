/* eslint-disable no-useless-escape */

const colors = [
  { query: `(there).*?(be)`, color: 'gray' },

  { query: `wo(?=n't)`, color: '#fb5607', type: 'code' },
  { query: `will`, color: '#fb5607', type: 'code' },
  { query: `'ll`, color: '#fb5607', type: 'code' },
  { query: `vai`, color: '#fb5607', type: 'code' },

  { query: `'d (?=you|i|he|she|we|they)`, color: '#3a86ff', type: 'code' },
  { query: `did (?=you|i|he|she|we|they)`, color: '#3a86ff', type: 'code' },

  { query: `ed`, color: '#3a86ff' },
  { query: `done`, color: '#3a86ff' },

  { query: `\S+ed`, color: '#3a86ff' },

  { query: `been`, color: '#3a86ff' },
  { query: `was`, color: '#3a86ff' },
  { query: `were`, color: '#3a86ff' },
  { query: `there (?:was|were)`, color: '#3a86ff' },

  { query: `there (?:is|'s|are|'re)`, color: '#8ac926' },
  { query: `is\W`, color: '#8ac926' },
  { query: `are\W`, color: '#8ac926' },
  { query: `'re\W`, color: '#8ac926' },
  { query: `is\W'`, color: '#8ac926' },
  { query: `(?<=he|she|it)'s`, color: '#8ac926' },
  { query: `é\W`, color: '#8ac926' },
  { query: `est\S+`, color: '#8ac926' },
  { query: `se\S+`, color: '#8ac926' },

  { query: `not`, color: '#FF0000' },
  { query: `não`, color: '#FF0000' },
  { query: `n't`, color: '#FF0000' },
]

function innerColorExport(text) {
  let myText = text
  colors.forEach(color => {
    const regex = new RegExp(color.query, 'gi')
    const find = myText.match(color.query)?.[0]
    if (color.type === 'code') {
      myText = myText.replace(
        regex,
        `<span class="off" style="-webkit-text-stroke: 1px ${color.color}; text-shadow: 2px 2px 0px ${color.color}; color: white">${find}</span>`
      )
    } else {
      myText = myText.replace(
        regex,
        `<span class="off" style="color: ${color.color}; text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.6);">${find}</span>`
      )
    }
  })
  return myText
}

module.exports = { colors, innerColorExport }
