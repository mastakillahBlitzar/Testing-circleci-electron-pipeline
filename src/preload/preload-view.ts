import { contextBridge, ipcRenderer } from "electron";

function initPreloadEmbedded(): void {
  contextBridge.exposeInMainWorld("electron", {
    pingMain: (appName: string, message: string) =>
      ipcRenderer.send("ping", appName, message),
    recieveMessage: (channel: string, func: (args: unknown[]) => void) => {
      ipcRenderer.on(channel, (event, ...args) => func(args));
    },
    showNotification: (appName: string, message: string) =>
      ipcRenderer.send("show-notification", appName, message)
  });
}

initPreloadEmbedded();
