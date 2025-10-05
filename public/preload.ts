import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

export interface ElectronAPI {
  sendSync: (chan: string, message: unknown) => boolean;
  onMessageReceived: (
    chan: string,
    callback: (event: IpcRendererEvent, message: unknown) => void
  ) => void;
}

contextBridge.exposeInMainWorld("electronAPI", {
  sendSync: (chan: string, message: unknown) => ipcRenderer.sendSync(chan, message),
  onMessageReceived: (
    chan: string,
    callback: (event: IpcRendererEvent, message: unknown) => void
  ) => ipcRenderer.on(chan, callback),
} as ElectronAPI);
