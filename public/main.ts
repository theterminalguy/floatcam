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
    width: 600,
    maximizable: false,
    resizable: false,
    autoHideMenuBar: true,
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
    width: 125,
    height: 125,
    maxWidth: 500,
    maxHeight: 500,
    resizable: false,
    titleBarStyle: "hidden",
    transparent: true,
    darkTheme: false,
    hasShadow: false,
    frame: false,
    alwaysOnTop: true,
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
  const access = systemPreferences.getMediaAccessStatus("camera");
  if (access !== "granted") {
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
  }

  const mainWindow = createMainWindow();
  const camWindow = createCameraWindow();
  camWindow.setAlwaysOnTop(true, "floating", 1);

  let borderSize = 0;
  let lastSizeWith: [number, number] = [125, 125];

  ipcMain.on("shared-window-channel", (event, arg: WindowMessage) => {
    camWindow.webContents.send("shared-window-channel", arg);

    if (arg.type === "set-webcams") {
      mainWindow.webContents.send("shared-window-channel", arg);
    }

    if (arg.type === "set-camera-resolution" && arg.payload) {
      let { width, height } = arg.payload;
      if (width && height) {
        // adding 25 just to make sure the window is not too small to fit the camera
        const widthNum = Number(width.replace("px", "")) + 25;
        const heightNum = Number(height.replace("px", "")) + 25;
        lastSizeWith = [widthNum, heightNum];
        camWindow.setSize(widthNum, heightNum);
      }
    } else if (arg.type === "set-border-width") {
      const borderWidth = typeof arg.payload === "string" ? arg.payload : String(arg.payload);
      switch (borderWidth) {
        case "0": {
          borderSize = 0;
          break;
        }
        case "thin": {
          borderSize = 3;
          break;
        }
        case "medium": {
          borderSize = 5;
          break;
        }
        case "thick": {
          borderSize = 20;
          break;
        }
      }

      // Resize window with count borders
      camWindow.setSize(
        lastSizeWith[0] + borderSize,
        lastSizeWith[1] + borderSize
      );
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
