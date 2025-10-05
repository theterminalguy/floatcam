"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const electron_1 = require("electron");
function createMainWindow() {
    const win = new electron_1.BrowserWindow({
        width: 120,
        height: 550,
        maximizable: false,
        resizable: false,
        transparent: true,
        frame: false,
        titleBarStyle: "customButtonsOnHover",
        hasShadow: false,
        autoHideMenuBar: true,
        fullscreenable: false,
        webPreferences: {
            preload: path_1.default.join(__dirname, "preload.js"),
            nodeIntegration: true,
            contextIsolation: true,
        },
    });
    const loadURL = process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : `file://${path_1.default.join(__dirname, "../build/index.html")}`;
    win.loadURL(loadURL);
    win.removeMenu();
    win.setMenuBarVisibility(false);
    return win;
}
function createCameraWindow() {
    const win = new electron_1.BrowserWindow({
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
            preload: path_1.default.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });
    win.loadFile(path_1.default.join(__dirname, "cam.html"));
    return win;
}
electron_1.app.whenReady().then(async () => {
    const camAllowed = await electron_1.systemPreferences
        .askForMediaAccess("camera")
        .then(async (access) => {
        if (!access) {
            new electron_1.Notification({
                title: "Camera Access",
                body: "Camera access is required to use this app",
            }).show();
            return false;
        }
        return true;
    });
    if (!camAllowed) {
        electron_1.app.quit();
        return;
    }
    const mainWindow = createMainWindow();
    const camWindow = createCameraWindow();
    camWindow.setAlwaysOnTop(true, "floating", 1);
    electron_1.ipcMain.on("shared-window-channel", (event, arg) => {
        camWindow.webContents.send("shared-window-channel", arg);
        if (arg.type === "set-webcams") {
            mainWindow.webContents.send("shared-window-channel", arg);
        }
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
    electron_1.app.on("activate", () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
});
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
