import {
  app,
  BrowserWindow,
  BrowserView,
  ipcMain,
  Notification
} from "electron";
import * as path from "path";
import { sumArray } from "bluejay";

let win: Electron.BrowserWindow | null;
let view: Electron.BrowserView | null;
let isExtended = false;

let messagesCounter = 0;
const sidebarWidth = 360;
const sidebarHeight = 800;
const extendedWidth = 1200;
const defaultWebPreferences = {
  nodeIntegration: false,
  contextIsolation: true,
  sandbox: true
};

console.log(`Native dependency demo: ${sumArray([1, 2, 3])}`);

const createWindow = (): void => {
  win = new BrowserWindow({
    width: sidebarWidth,
    height: sidebarHeight,
    webPreferences: {
      ...defaultWebPreferences,
      preload: path.resolve(path.join(__dirname, "preload-window.js")),
      devTools: process.env.NODE_ENV !== "production"
    }
  });
  if (process.env.NODE_ENV === "development") {
    win.loadURL("http://localhost:9000");

    // Show Sidecar app at the left side of the window
    // win.loadURL("https://sidecar.dev.aks.commure.com/smart/sidecar");
    // win.loadURL("https://fend.local.commure.com:3030/smart/sidecar");

    // Show devtools for the window Renderer process
    // win.webContents.openDevTools({mode: 'undocked'});
  } else {
    win.loadFile("src/index.html");
  }
};

const toggleView = (): void => {
  if (isExtended) {
    isExtended = false;
    win?.setBounds({ width: sidebarWidth });
    win?.setBrowserView(null);
  } else {
    isExtended = true;
    win?.setBounds({ width: extendedWidth }, true);
    // Local dummy React app
    openBrowserView("http://localhost:3000");
    // openBrowserView('https://commure.com/');
  }
};

const openBrowserView = (url: string) => {
  if (!view) {
    view = new BrowserView({
      webPreferences: {
        ...defaultWebPreferences,
        preload: path.resolve(path.join(__dirname, "preload-view.js"))
      }
    });
    view.setAutoResize({ width: true, height: true });
    view.webContents.loadURL(url);
  }
  win?.setBrowserView(view);
  view.setBounds({
    x: sidebarWidth,
    y: 0,
    width: (win?.getBounds().width || extendedWidth) - sidebarWidth,
    height: win?.getBounds().height || sidebarHeight
  });
  // Show devtools for the enmbedded app process
  // view.webContents.openDevTools({mode: 'undocked'});
  win?.center();
};

app.on("ready", createWindow);

ipcMain.on("ping", (_, appName, message) => {
  console.log("Ping From: ", appName, " - ", message);
});

ipcMain.on("show-notification", (_, appName, message) => {
  const notification = {
    title: `${appName} Notification`,
    body: message
  };
  new Notification(notification).show();
});

ipcMain.on("send-message", (_, message) => {
  console.log("Sending sidecar message: ", message);
  messagesCounter++;
  view?.webContents.send("main-event", `${message} - ${messagesCounter}`);
});

ipcMain.on("toggle-view", () => {
  toggleView();
});

app.on("window-all-closed", function () {
  if (process.platform != "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
