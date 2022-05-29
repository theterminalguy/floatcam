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
    width: 500,
    height: 500,
    resizable: false,
    webPreferences: {
      preload: __dirname + "/preload.js",
    },
  });
  win.loadFile("public/cam.html");
  return win;
}

app.whenReady().then(() => {
  const mainWindow = createMainWindow();
  const camWindow = createCameraWindow();

  ipcMain.on("shared-window-channel", (event, arg) => {
    camWindow.webContents.send("shared-window-channel", arg);
    if (arg.type && arg.type === "set-webcams") {
      mainWindow.webContents.send("shared-window-channel", arg);
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
