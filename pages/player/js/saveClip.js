require('module-alias/register')
const obs = require('../../../utils/observer')
const subtitle = require('@player/Subtitle')
const fs = require('fs')

function appendDataOnJsonFile(data) {
  let myJson = []
  try {
    myJson = require('@root/user-saves')
  } catch (error) {
    if (error.code === 'ENOENT') console.log('file not found')
  }
  const ifNotIn =
    myJson.find(
      item => item.sentenceSub.subsIndex.en === data.sentenceSub.subsIndex.en
    ) === undefined

  if (ifNotIn) {
    myJson.push(data)
    fs.writeFileSync('./user-saves.json', JSON.stringify(myJson, null, 2))
    obs('warning').notify('show', {
      title: 'Save Clip',
    })
  } else {
    obs('warning').notify('show', {
      title: 'Already Saved!!',
    })
  }
}

function saveCLip() {
  const data = {
    infoPath: subtitle.infoPath,
    sentenceSub: subtitle.getLastSub(),
  }
  appendDataOnJsonFile(data)
}

obs('CONTROL').on('saveClip', saveCLip)
