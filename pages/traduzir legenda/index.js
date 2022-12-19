// get all files srt in folder inside movies folder
const fs = require('fs')
const pathJoin = require('path').join
const readlineSync = require('readline-sync')
const parser = require('subtitles-parser')
const configPlayer = require('../../config-player')

const movieFolder = configPlayer.foldersMovies[0]

const folders = fs.readdirSync(movieFolder)

const allSrtFile = folders.reduce((acc, folder) => {
  folder = pathJoin(movieFolder, folder)
  //check if is folder
  if (!fs.lstatSync(folder).isDirectory()) return acc
  const files = fs.readdirSync(folder)
  if (files.includes('portuguese.srt')) return acc

  const srtFiles = files.filter(
    file => file.endsWith('.srt') && !file.includes('port')
  )

  return [
    ...acc,
    ...srtFiles.map(file => ({
      filePath: pathJoin(folder, file),
      folderPath: folder,
    })),
  ]
}, [])

const allSrtOnlySrt = allSrtFile.reduce((acc, { filePath, folderPath }) => {
  const fileSrtTxt = fs.readFileSync(filePath, 'utf8')
  const srtData = parser.fromSrt(fileSrtTxt)
  return [...acc, { srt: srtData, filePath, folderPath }]
}, [])

const translateAllText = allSrtOnlySrt.map(({ srt, folderPath }) => {
  const fileTxt = srt.map(v => v.text.replace('\n', '\\n'))

  //write file .txt
  fs.writeFileSync(pathJoin(__dirname, 'last-legenda.txt'), fileTxt.join('\n'))

  console.log(folderPath)

  if (srt.length < 100) {
    console.log('SEM LEGENDA')
    return
  }
  const resposta = readlineSync.question('Digite enter para o proximo:')
  if (resposta !== '') {
    console.log('Pulou... \n\n')
    return
  }

  //read file
  const translationTxt = fs.readFileSync(
    pathJoin(__dirname, 'translate-last-legenda.txt'),
    'utf8'
  )

  const translateSplitted = translationTxt.split('\r\n')
  if (translateSplitted.length !== srt.length) {
    console.log(translateSplitted[5].replace('\n', '\\n'))
    console.log(srt[5].text)
    throw new Error('Não tem mesmo tamanho')
  }

  const translationSrt = translateSplitted.map((sentenceTranslate, i) => {
    return {
      id: i + 1,
      startTime: srt[i].startTime,
      endTime: srt[i].endTime,
      text: sentenceTranslate.replace('\\n', '\n'),
    }
  })

  if (srt[1].text === translationSrt[1].text) {
    throw new Error('não traduziu')
  }

  //write file .srt
  fs.writeFileSync(
    pathJoin(folderPath, 'portuguese.srt'),
    parser.toSrt(translationSrt)
  )
  console.log(
    'catalogado...',
    translationSrt.length === srt.length ? 'TAMANHO_OK' : 'ERRO_TAMANHO'
  )
  console.log('\n\n')

  return
  // const srtData = srt.map(v => {
  //   console.log(v.text)
  //   return {
  //     ...v,
  //     // text: translate(v.text),
  //   }
  // })
  // const input = readlineSync.question('Oi')
  // return srtData
})
