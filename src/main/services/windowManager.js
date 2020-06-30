import path from 'path'
import { BrowserWindow, Menu } from 'electron'
import electronDevtoolsInstaller, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'

import menuconfig from '../config/menu'
import config from '@config'
import setIpc from './ipcMain'
import checkupdate from './checkupdate'
import download from './downloadFile'
import auto from "./auto"

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
// 这个瓜皮全局变量只能在单个js中生效，而并不是整个主进程中
if (process.env.NODE_ENV !== 'development')
{
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}
// 将文件地址挪到这里
const winURL = process.env.NODE_ENV === 'development' ? `http://localhost:${process.env.PORT}` : `file://${__dirname}/index.html`
const loadingURL = process.env.NODE_ENV === 'development' ? `http://localhost:${process.env.PORT}/static/loader.html` : `file://${__static}/loader.html`
var loadWindow = null
var mainWindow = null

function createMainWindow()
{
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 700,
    useContentSize: false,
    width: 600,
    minWidth: 600,
    show: false,
    frame: config.IsUseSysTitle,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      // 如果是开发模式可以使用devTools
      devTools: process.env.NODE_ENV === 'development',
      // 在macos中启用橡皮动画
      scrollBounce: process.platform === 'darwin'
    }
  })
  // 这里设置只有开发环境才注入显示开发者模式
  if (process.env.NODE_ENV === 'development')
  {
    menuconfig.push({
      label: '开发者设置',
      submenu: [{
        label: '切换到开发者模式',
        accelerator: 'CmdOrCtrl+I',
        role: 'toggledevtools'
      }]
    })
  }
  // 载入菜单
  const menu = Menu.buildFromTemplate(menuconfig)
  Menu.setApplicationMenu(menu)
  mainWindow.loadURL(winURL)

  setIpc(mainWindow, config.IsUseSysTitle)
  checkupdate(mainWindow)
  download(mainWindow)
  auto(mainWindow)

  if (process.env.NODE_ENV === 'development')
  {
    mainWindow.webContents.once('dom-ready', () =>
    {
      mainWindow.show()
      electronDevtoolsInstaller(VUEJS_DEVTOOLS)
        .then((name) => console.log(`installed: ${name}`))
        .catch(err => console.log('Unable to install `vue-devtools`: \n', err))
      loadWindow.destroy()
    })
    mainWindow.webContents.openDevTools(true)
  } else
  {
    mainWindow.webContents.once('dom-ready', () =>
    {
      mainWindow.show()
      loadWindow.destroy()
    })
  }

  mainWindow.on('closed', () =>
  {
    mainWindow = null
  })
}

function loadindWindow()
{
  loadWindow = new BrowserWindow({
    width: 400,
    height: 600,
    frame: false,
    backgroundColor: '#222',
    transparent: true,
    skipTaskbar: true,
    resizable: false,
    webPreferences: { experimentalFeatures: true }
  })

  loadWindow.loadURL(loadingURL)

  loadWindow.show()

  setTimeout(() =>
  {
    createMainWindow()
  }, 2000)

  loadWindow.on('closed', () =>
  {
    loadWindow = null
  })
}

export default function ()
{
  if (config.UseStartupChart)
  {
    return loadindWindow()
  } else
  {
    return createMainWindow()
  }
}
