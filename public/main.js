const { app, BrowserWindow, ipcMain } = require("electron");

function createMainWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: __dirname + "/preload.js",
    },
  });
  win.loadURL("http://localhost:3000");
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

function createPaintWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 1000,
  });
  win.loadFile("public/paint.html");
  return win;
}

app.whenReady().then(() => {
  const mainWindow = createMainWindow();
  const camWindow = createCameraWindow();

  createPaintWindow();

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
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
