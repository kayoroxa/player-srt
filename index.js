const { app, BrowserWindow } = require('electron')

let mainWindow

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webSecurity: false,
    },
  })
  mainWindow.maximize()
  mainWindow.loadURL(`file://${__dirname}/pages/player/player.html`)
  // mainWindow.loadURL(`file://${__dirname}/pages/library/index.html`)

  // setInterval(() => {
  // }, 6000)
  mainWindow.on('close', ev => {
    ev.sender.hide()
    ev.preventDefault() // prevent quit process
    mainWindow.close()
    mainWindow.removeAllListeners('close')
    mainWindow = null
  })
})
//♪
// /#
