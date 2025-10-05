import path from "path";
import { app, BrowserWindow, ipcMain, Notification, systemPreferences } from "electron";

interface WindowMessage {
  type: string;
  payload?: {
    width?: string;
    height?: string;
    [key: string]: unknown;
  };
}

function createMainWindow(): BrowserWindow {
  const win = new BrowserWindow({
    width: 800,
    height: 700,
    maximizable: false,
    resizable: false,
    transparent: true,
    frame: false,
    titleBarStyle: "customButtonsOnHover",
    hasShadow: false,
    autoHideMenuBar: true,
    fullscreenable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  const loadURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`;

  win.loadURL(loadURL);
  win.removeMenu();
  win.setMenuBarVisibility(false);
  return win;
}

function createCameraWindow(): BrowserWindow {
  const win = new BrowserWindow({
    width: 120,
    height: 120,
    maxWidth: 500,
    maxHeight: 500,
    resizable: false,
    titleBarStyle: "customButtonsOnHover",
    transparent: true,
    darkTheme: false,
    hasShadow: false,
    frame: false,
    alwaysOnTop: true,
    fullscreenable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  win.loadFile(path.join(__dirname, "cam.html"));
  return win;
}

app.whenReady().then(async () => {
  const camAllowed = await systemPreferences
    .askForMediaAccess("camera")
    .then(async (access: boolean) => {
      if (!access) {
        new Notification({
          title: "Camera Access",
          body: "Camera access is required to use this app",
        }).show();
        return false;
      }
      return true;
    });

  if (!camAllowed) {
    app.quit();
    return;
  }

  const mainWindow = createMainWindow();
  const camWindow = createCameraWindow();
  camWindow.setAlwaysOnTop(true, "floating", 1);

  ipcMain.on("shared-window-channel", (event, arg: WindowMessage) => {
    // Handle exit app request
    if (arg.type === "exit-app") {
      app.quit();
      event.returnValue = true;
      return;
    }

    // Forward request-webcams to camera window
    if (arg.type === "request-webcams") {
      camWindow.webContents.send("shared-window-channel", arg);
      event.returnValue = true;
      return;
    }

    // Forward all messages to camera window
    camWindow.webContents.send("shared-window-channel", arg);

    // Forward set-webcams to main window
    if (arg.type === "set-webcams") {
      mainWindow.webContents.send("shared-window-channel", arg);
    }

    // Handle camera resolution changes
    if (arg.type === "set-camera-resolution" && arg.payload) {
      let { width, height } = arg.payload;
      if (width && height) {
        // adding 20 just to make sure the window is not too small to fit the camera
        const widthNum = Number(width.replace("px", "")) + 20;
        const heightNum = Number(height.replace("px", "")) + 20;
        camWindow.setSize(widthNum, heightNum);
      }
    }

    event.returnValue = true;
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
