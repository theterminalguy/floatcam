const path = require("path");
const { app, BrowserWindow, ipcMain, Notification, systemPreferences } = require("electron");

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
    process.env.NODE_ENV === "development" ?
      "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`;
  win.loadURL(loadURL);
  win.removeMenu();
  win.setMenuBarVisibility(false);
  return win;
}

function createCameraWindow() {
  const win = new BrowserWindow({
    width: 120,
    height: 120,
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
  const camAllowed = await systemPreferences.askForMediaAccess("camera").then(async (access) => {
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

  const mainWindow = createMainWindow();
  const camWindow = createCameraWindow();
  camWindow.setAlwaysOnTop(true, "floating", 1);

  ipcMain.on("shared-window-channel", (event, arg) => {
    camWindow.webContents.send("shared-window-channel", arg);
    if (arg.type && arg.type === "set-webcams") {
      mainWindow.webContents.send("shared-window-channel", arg);
    }
    if (arg.type && arg.type === "set-camera-resolution") {
      let { width, height } = arg.payload;
      // adding 20 just to make sure the window is not too small to fit the camera
      width = Number(width.replace("px", "")) + 20;
      height = Number(height.replace("px", "")) + 20;
      camWindow.setSize(width, height);
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
