import $electron from 'electron'

export default {
  invoke(...args)
  {
    return $electron.ipcRenderer.invoke(...args)
  },
  send(...args)
  {
    return $electron.ipcRenderer.send(...args)
  },
  on(...args)
  {
    return $electron.ipcRenderer.on(...args)
  },
  remove(channel)
  {
    $electron.ipcRenderer.removeAllListeners(channel)
  }
}
