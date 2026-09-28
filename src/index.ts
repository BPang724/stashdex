import { app, BrowserWindow, ipcMain } from 'electron';
import squirrelStartup from 'electron-squirrel-startup';

declare const CAPTURE_WINDOW_WEBPACK_ENTRY: string;
declare const CAPTURE_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

declare const LIBRARY_WINDOW_WEBPACK_ENTRY: string;
declare const LIBRARY_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (squirrelStartup) {
  app.quit();
}

let captureWindow: BrowserWindow | null = null;
let libraryWindow: BrowserWindow | null = null;

const createCaptureWindow = (): BrowserWindow => {
  const window = new BrowserWindow({
    width: 360,
    height: 240,
    resizable: false,
    webPreferences: {
      preload: CAPTURE_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  window.loadURL(CAPTURE_WINDOW_WEBPACK_ENTRY);

  return window;
};

const createLibraryWindow = (): BrowserWindow => {
  const window = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: LIBRARY_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  window.loadURL(LIBRARY_WINDOW_WEBPACK_ENTRY);

  return window;
};

const openLibraryWindow = (): void => {
  if (libraryWindow && !libraryWindow.isDestroyed()) {
    if (libraryWindow.isMinimized()) {
      libraryWindow.restore();
    }

    libraryWindow.show();
    libraryWindow.focus();

    return;
  }

  libraryWindow = createLibraryWindow();

  libraryWindow.on('closed', () => {
    libraryWindow = null;
  });
};

app.whenReady().then(() => {
  captureWindow = createCaptureWindow();

  captureWindow.on('closed', () => {
    captureWindow = null;
  });

  ipcMain.on('library:open', () => {
    openLibraryWindow();
  });

  app.on('activate', () => {
    if (!captureWindow || captureWindow.isDestroyed()) {
      captureWindow = createCaptureWindow();

      captureWindow.on('closed', () => {
        captureWindow = null;
      });
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});