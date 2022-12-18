/* eslint-disable no-unreachable */
/* eslint-disable no-debugger */
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
  let lastIndex = -1
  let lastSubtitle = false

  function readMySrt(folderPath, obj) {
    if (!obj?.lag) throw new Error('obj.lag is required')

    const pathSrt = folderAnalyse(folderPath, {
      includeName: obj?.lag === 'pt' ? 'portuguese' : false,
      notIncludeName: obj?.lag === 'en' ? 'portuguese' : false,
      filterExt: 'srt',
    })[0]

    if (!pathSrt) {
      throw new Error(`pathSrt not find: ${folderPath}`)
    }

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
    const path = infoPath[language]
    const newData = callback({
      prev: subData[language],
      index: lastSubtitle.subsIndex[language],
    })
    console.log(newData[500])
    subData[language] = newData

    const dataStr = parser.toSrt(
      newData.map(sub => ({
        ...sub,
        startTime: sub.startTime * 1000,
        endTime: sub.endTime * 1000,
      }))
    )

    fs.writeFile(path, dataStr, err => {
      if (err) console.log(err)
    })
  }

  function changeTimeShift(shiftTime, side = 'left') {
    const mySide = side === 'left' ? 'startTime' : 'endTime'

    subData.en[lastIndex][mySide] += shiftTime
    subData.pt[lastIndex][mySide] += shiftTime

    if (
      subData.en[lastIndex - 1]['endTime'] >= subData.en[lastIndex]['startTime']
    ) {
      subData.en[lastIndex - 1]['endTime'] =
        subData.en[lastIndex]['startTime'] - 0.4

      subData.pt[lastIndex - 1]['endTime'] =
        subData.en[lastIndex]['startTime'] - 0.4
    }

    const video = document.querySelector('video')

    video.currentTime =
      subData.en[lastIndex][mySide] - (side === 'right' ? 0.4 : 0)

    // if (side === 'right') {
    //   const listener = () => {
    //     if (video.currentTime > )
    //   }
    //   video.addEventListener('timeupdate', listener)

    // }

    video.play()

    writeSrt(() => subData.en, 'en')
    writeSrt(() => subData.pt, 'pt')

    // writeSrt(({ prev, index }) => {
    //   return prev.map((item, i) => {
    //     if (i === lastIndex) {
    //       return {
    //         ...item,
    //         startTime: subData.en[lastIndex - 1],
    //         endTime: item.endTime + timeShift,
    //       }
    //     }
    //     return item
    //   })
    // }, 'en')

    // writeSrt(({ prev, index }) => {
    //   return prev.map((item, i) => {
    //     if (i === lastIndex) {
    //       return {
    //         ...item,
    //         startTime: item.startTime + timeShift,
    //         endTime: item.endTime + timeShift,
    //       }
    //     }
    //     return item
    //   })
    // }, 'pt')
  }

  function allShift(time) {
    debugger
    subData.en = subData.en.map((s, i) => ({
      ...s,
      startTime: subData.en[i] + time,
      endTime: subData.en[i] - time,
    }))

    subData.pt = subData.pt.map((s, i) => ({
      ...s,
      startTime: subData.pt[i] + time,
      endTime: subData.en[i] - time,
    }))
  }

  function changeIndexSub(indexOrCallBack, notify) {
    let newIndex
    if (typeof indexOrCallBack === 'function') {
      newIndex = indexOrCallBack(othersInfo.indexSentenceSub)
    } else {
      newIndex = indexOrCallBack
    }
    if (lastIndex === newIndex) return
    othersInfo.indexSentenceSub = newIndex

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
    lastIndex = newIndex
    if (notify) obs('subtitle').notify('changeIndex', lastSubtitle)
    return lastSubtitle
  }

  function getLastSub() {
    return lastSubtitle
  }

  function getIndexSub() {
    return othersInfo.indexSentenceSub
  }
  changeSrt(configPlayer.path)

  return {
    changeSrt,
    infoPath,
    othersInfo,
    writeSrt,
    subData,
    data: subData,
    changeIndexSub,
    getLastSub,
    getIndexSub,
    changeTimeShift,
    allShift,
  }
}

const subtitle = Subtitle()
// global console variavel
global.subtitle = subtitle
module.exports = subtitle
