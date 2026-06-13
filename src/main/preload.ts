/**
 * Preload script for secure IPC communication
 * Exposes limited APIs to the renderer process
 */

import { contextBridge, ipcRenderer } from 'electron';

const electronAPI = {
  // Settings API
  getAppSettings: () => ipcRenderer.invoke('get-app-settings'),
  updateAppSettings: (settings: any) =>
    ipcRenderer.invoke('update-app-settings', settings),

  // Camera API
  getCameras: () => ipcRenderer.invoke('get-cameras'),

  // File operations
  saveScreenshot: (imageData: string) =>
    ipcRenderer.invoke('save-screenshot', imageData),
  showSaveDialog: (options: any) =>
    ipcRenderer.invoke('show-save-dialog', options),

  // Event listeners
  onAppReady: (callback: () => void) => {
    ipcRenderer.on('app-ready', callback);
  },
  onError: (callback: (error: Error) => void) => {
    ipcRenderer.on('app-error', (_event, error) => callback(error));
  },
};

// Expose limited API to renderer process
contextBridge.exposeInMainWorld('electronAPI', electronAPI);
