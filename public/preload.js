const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  sendSync: (chan, message) => ipcRenderer.sendSync(chan, message),
  onMessageReceived: (chan, callback) => ipcRenderer.on(chan, callback),
});
