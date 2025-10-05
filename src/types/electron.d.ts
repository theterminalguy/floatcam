export interface ElectronAPI {
  sendSync: (chan: string, message: unknown) => boolean;
  onMessageReceived: (chan: string, callback: (event: unknown, message: unknown) => void) => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

export {};
