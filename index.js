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
    },
  })
  mainWindow.maximize()
  mainWindow.loadURL(`file://${__dirname}/pages/player/player.html`)
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
