const obs = require('../../../../utils/observer')
const readSrt = require('../../../../utils/readSrt')
const { findVideoPath } = require('../utils')
const pathJoin = require('path').join

function changeTimeAndVideo({ exactly, query, index, find }) {
  // if (!find[index]) return
  const mp4InFolder = findVideoPath({ pathMovie: find[index].moviePath })
  const srtInFolder = findVideoPath({
    pathMovie: find[index].moviePath,
    type: '.srt',
  })
  const ptSrtInFolder = pathJoin(find[index].moviePath, 'portuguese.srt')

  const srt = readSrt(srtInFolder)
  const ptSrt = readSrt(ptSrtInFolder) || []

  // console.log({ srt })
  obs('video').notify('srcChange', { src: mp4InFolder })
  obs('video').notify('timeChange', find[index].subFind.startTime)
  obs('subtitle').notify('change', { subEn: srt, subPt: ptSrt })
  obs('subtitle').notify('highLight', {
    match: exactly ? `\\b(${query})\\b` : `(${query})`,
  })
  obs('warning').notify('show', {
    title: `Search for ${query}`,
    message: `${index + 1}/${find.length}`,
  })
  if (!mp4InFolder) console.log('mp4InFolder not found', find[index].moviePath)
}

obs('search').on('changeTimeAndVideo', changeTimeAndVideo)
