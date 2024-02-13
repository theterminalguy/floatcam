const path = require("path");
const {
  app,
  BrowserWindow,
  ipcMain,
  Notification,
  systemPreferences,
} = require("electron");
const os = require("node:os");

function createMainWindow() {
  const win = new BrowserWindow({
    width: 600,
    maximizable: false,
    resizable: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: __dirname + "/preload.js",
      nodeIntegration: true,
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

function createCameraWindow() {
  const win = new BrowserWindow({
    width: 125,
    height: 125,
    maxWidth: 500,
    maxHeight: 500,
    resizable: false,
    titleBarStyle: "hide",
    transparent: true,
    darkTheme: false,
    hasShadow: false,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      preload: __dirname + "/preload.js",
    },
  });
  win.loadFile("public/cam.html");
  return win;
}

app.whenReady().then(async () => {
  const access = systemPreferences.getMediaAccessStatus("camera");
  if (access !== "granted") {
    const camAllowed = await systemPreferences
      .askForMediaAccess("camera")
      .then(async (access) => {
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
    }
  }

  const mainWindow = createMainWindow();
  const camWindow = createCameraWindow();
  camWindow.setAlwaysOnTop(true, "floating", 1);

  let borderSize = 0;
  let lastSizeWith = [125, 125];
  ipcMain.on("shared-window-channel", (event, arg) => {
    camWindow.webContents.send("shared-window-channel", arg);
    if (arg.type && arg.type === "set-webcams") {
      mainWindow.webContents.send("shared-window-channel", arg);
    }
    if (arg.type && arg.type === "set-camera-resolution") {
      let { width, height } = arg.payload;
      // adding 20 just to make sure the window is not too small to fit the camera
      width = Number(width.replace("px", "")) + 25;
      height = Number(height.replace("px", "")) + 25;
      lastSizeWith = [width, height];
      camWindow.setSize(width, height);
    } else if (arg.type && arg.type === "set-border-width") {
      switch (arg.payload) {
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
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
