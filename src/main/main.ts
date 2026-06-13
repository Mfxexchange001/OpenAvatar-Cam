/**
 * OpenAvatar Cam - Main Electron Process
 * Handles window creation, IPC communication, and application lifecycle
 */

import {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  dialog,
  nativeImage,
} from 'electron';
import isDev from 'electron-is-dev';
import path from 'path';
import Store from 'electron-store';

// Initialize store for persistent app settings
const store = new Store();

let mainWindow: BrowserWindow | null = null;

/**
 * Create the main application window
 */
function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 960,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      sandbox: true,
    },
  });

  // Load the app
  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../../build/index.html')}`;

  mainWindow.loadURL(startUrl);

  // Open DevTools in development
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

/**
 * Create application menu
 */
function createMenu() {
  const template: any[] = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
      ],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

/**
 * Initialize IPC handlers for renderer process communication
 */
function initializeIPC() {
  // Get app settings
  ipcMain.handle('get-app-settings', () => {
    return store.store;
  });

  // Update app settings
  ipcMain.handle('update-app-settings', (_event, settings) => {
    store.set(settings);
    return { success: true };
  });

  // Get available cameras
  ipcMain.handle('get-cameras', async () => {
    try {
      return [
        {
          deviceId: 'default',
          label: 'Built-in Camera',
        },
      ];
    } catch (error) {
      console.error('Error getting cameras:', error);
      return [];
    }
  });

  // Save screenshot
  ipcMain.handle('save-screenshot', async (_event, imageData: string) => {
    try {
      const fileName = `screenshot-${Date.now()}.png`;
      const filePath = path.join(
        app.getPath('documents'),
        'OpenAvatar',
        'screenshots',
        fileName
      );

      // Create directory if it doesn't exist
      const fs = require('fs');
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Save image
      const buffer = Buffer.from(imageData.split(',')[1], 'base64');
      fs.writeFileSync(filePath, buffer);

      return { success: true, path: filePath };
    } catch (error) {
      console.error('Error saving screenshot:', error);
      return { success: false, error: (error as Error).message };
    }
  });

  // Show save dialog
  ipcMain.handle('show-save-dialog', async (_event, options: any) => {
    try {
      if (!mainWindow) throw new Error('Main window not found');
      const result = await dialog.showSaveDialog(mainWindow, options);
      return result;
    } catch (error) {
      console.error('Error showing save dialog:', error);
      return { canceled: true };
    }
  });
}

/**
 * App event handlers
 */
app.on('ready', () => {
  createWindow();
  createMenu();
  initializeIPC();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
});
