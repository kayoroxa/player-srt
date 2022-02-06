const parser = require('subtitles-parser')
const fs = require('fs')
const obs = require('../../utils/observer')
const readSrt = require('../../utils/readSrt')
const folderAnalyse = require('../../utils/folderAnalyse')
const configPlayer = require('../../config-player')

function Subtitle() {
  const infoPath = {
    folder: '',
    en: '',
    pt: '',
  }
  const othersInfo = {
    indexSentenceSub: 0,
  }
  const subData = {
    en: [],
    pt: [],
  }

  let lastSubtitle = false

  function readMySrt(folderPath, obj) {
    if (!obj?.lag) throw new Error('obj.lag is required')

    const pathSrt = folderAnalyse(folderPath, {
      includeName: obj?.lag === 'pt' ? 'portuguese' : false,
      notIncludeName: obj?.lag === 'en' ? 'portuguese' : false,
      filterExt: 'srt',
    })[0]

    if (!pathSrt) throw new Error('pathSrt not find')

    subData[obj?.lag] = readSrt(pathSrt)
    infoPath[obj?.lag] = pathSrt
    infoPath.folder = folderPath

    if (obj?.lag === 'en') {
      obs('subtitle').notify('loaded', {
        en: subData[obj?.lag],
        // pt: subtitlesDataPt,
      })
    }
    return {
      data: subData[obj?.lag],
      path: pathSrt,
    }
  }

  function changeSrt(path) {
    infoPath.folder = path
    const en = readMySrt(path, { lag: 'en', path: true })
    const pt = readMySrt(path, { lag: 'pt', path: true })

    subData.en = en.data
    infoPath.en = en.path

    subData.pt = pt.data
    infoPath.pt = pt.path
  }

  function writeSrt(callback, language) {
    // const path = infoPath[language]
    const newData = callback({
      prev: subData[language],
      index: lastSubtitle.subsIndex[language],
    })
    console.log(newData[500])
    subData[language] = newData
    // const dataStr = parser.toSrt(newData)
    // fs.writeFile(path, dataStr, err => {
    //   if (err) console.log(err)
    // })
  }

  function changeIndexSub(indexOrCallBack) {
    if (typeof indexOrCallBack === 'function') {
      othersInfo.indexSentenceSub = indexOrCallBack(othersInfo.indexSentenceSub)
    } else {
      othersInfo.indexSentenceSub = indexOrCallBack
    }
    const ptIndex = subData.pt.findIndex(
      pt => pt.id === subData.en[othersInfo.indexSentenceSub].id
    )
    lastSubtitle = {
      subsIndex: {
        pt: ptIndex,
        en: othersInfo.indexSentenceSub,
      },
      en: subData.en[othersInfo.indexSentenceSub],
      pt: subData.pt[ptIndex],
    }
    return lastSubtitle
  }

  function getLastSub() {
    return lastSubtitle
  }

  function getIndexSub() {
    console.log('getIndexSub', othersInfo.indexSentenceSub)
    return othersInfo.indexSentenceSub
  }
  changeSrt(configPlayer.path)

  return {
    changeSrt,
    infoPath,
    othersInfo,
    writeSrt,
    subData,
    changeIndexSub,
    getLastSub,
    getIndexSub,
  }
}

const subtitle = Subtitle()
// global console variavel
global.subtitle = subtitle
module.exports = subtitle
