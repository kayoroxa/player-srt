// const en = require('./en.json')
//   // .slice(0, 10)
//   .map(v => [v[0], Number(v[1]), Number(v[2])])
// const pt = require('./pt.json')
//   // .slice(0, 10)
//   .map(v => [v[0], Number(v[1]), Number(v[2])])

function indexByAgulha(number, array) {
  if (number === -1) return 0
  const index = array.findIndex(v => Math.abs(v[2] - number) < 0.9)
  return index
}

function joinMultipleSubtitle(subtitles) {
  if (subtitles.length < 1) return subtitles
  return [
    subtitles.reduce((acc, v) => acc + ' ' + v[0], ''),
    subtitles[0][1],
    subtitles[subtitles.length - 1][2],
  ]
}

function fixSincronize(enData, ptData) {
  enData = enData.map(v => [v[0], Number(v[1]), Number(v[2])])
  ptData = ptData.map(v => [v[0], Number(v[1]), Number(v[2])])
  // while
  let restoPt = ptData
  let restoEn = enData

  const fixSplitPt = []
  const fixSplitEn = []

  while (restoPt.length > 0 && restoEn.length > 0) {
    // console.log(restoPt.length, restoEn.length)
    let agulha = Math.max(restoEn[0][2], restoPt[0][2])

    const indexPt = indexByAgulha(agulha, restoPt)
    const indexEn = indexByAgulha(agulha, restoEn)

    fixSplitPt.push(joinMultipleSubtitle(restoPt.slice(0, indexPt + 1)))
    fixSplitEn.push(joinMultipleSubtitle(restoEn.slice(0, indexEn + 1)))

    // console.log({ indexPt, indexEn })

    restoPt = restoPt.slice(indexPt + 1)
    restoEn = restoEn.slice(indexEn + 1)
  }

  fixSplitEn.forEach((_, i) => {
    // console.log(fixSplitEn[i][0])
    // console.log(fixSplitPt[i][0])
    console.log('\n')
  })

  return {
    en: fixSplitEn,
    pt: fixSplitPt,
  }
}

// console.log(en)
// fixSincronize(en, pt)

module.exports = fixSincronize
