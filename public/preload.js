const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  sendAsync: (chan, message) => ipcRenderer.sendSync(chan, message),
});
