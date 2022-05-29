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
    width: 500,
    height: 500,
    resizable: false,
    webPreferences: {
      preload: __dirname + "/preload.js",
    },
  });
  win.loadFile("public/cam.html"); // paint window with html
  win.webContents.openDevTools(); // open devtools
  return win;
}

app.whenReady().then(() => {
  const mainWindow = createMainWindow();
  const camWindow = createCameraWindow(mainWindow);

  ipcMain.on("shared-window-channel", (event, arg) => {
    camWindow.webContents.send("shared-window-channel", arg);
    if (arg.type && arg.type === "set-webcams") {
      console.log("set-webcams", arg.payload);
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
