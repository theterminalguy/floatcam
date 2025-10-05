"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("electronAPI", {
    sendSync: (chan, message) => electron_1.ipcRenderer.sendSync(chan, message),
    onMessageReceived: (chan, callback) => electron_1.ipcRenderer.on(chan, callback),
});
