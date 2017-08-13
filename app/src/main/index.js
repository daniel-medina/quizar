'use strict'

import { app, BrowserWindow } from 'electron'

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
      ? `http://localhost:${require('../../../config').port}`
      : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 760,
    width: 860,
    minHeight: 760,
    minWidth: 860
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  /** To use only for testing purposes */
  // mainWindow.webContents.openDevTools()
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
