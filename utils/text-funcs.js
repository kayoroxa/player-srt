function textToInner(text) {
  console.log({ text, len: text.length })
  if (text.length > 72) {
    return text.replace(/\n/g, '<br>')
  } else {
    return text.replace(/\n/g, ' ')
  }
}

function sanitizer(text) {
  return text
    .replace(/<.*>/g, '')
    .replace(/\(.*\)/g, '')
    .replace(/\[.*\]/g, '')
    .replace(/-/g, '')
    .replace(/\s\s+/g, ' ')
    .trim()
}

module.exports = {
  textToInner,
  sanitizer,
}
