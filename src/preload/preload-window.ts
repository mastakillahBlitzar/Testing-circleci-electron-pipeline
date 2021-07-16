import { contextBridge, ipcRenderer } from "electron";
function init(): void {
  contextBridge.exposeInMainWorld("electron", {
    pingMain: (appName: string, message: string) =>
      ipcRenderer.send("ping", appName, message),
    toggleView: () => ipcRenderer.send("toggle-view"),
    sendEventToApps: (message: string) =>
      ipcRenderer.send("send-message", message)
  });
}

init();
