interface WindowMessage {
  type: string;
  payload: unknown;
}

interface ElectronAPI {
  sendSync: (chan: string, message: unknown) => boolean;
  onMessageReceived: (chan: string, callback: (event: unknown, message: WindowMessage) => void) => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

export {};
