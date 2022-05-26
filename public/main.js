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
  // open devtools
  win.webContents.openDevTools();
  return win;
}

function createCameraWindow(parentWindow) {
  const win = new BrowserWindow({
    parent: parentWindow,
    width: 400,
    height: 400,
    resizable: false,
  });
  win.loadFile("public/cam.html"); // paint window with html
  win.webContents.openDevTools(); // open devtools
  return win;
}

app.whenReady().then(() => {
  const mainWindow = createMainWindow();
  createCameraWindow(mainWindow);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
