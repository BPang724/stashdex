import {
  app,
  BrowserWindow,
  ipcMain,
  screen,
} from 'electron';
import squirrelStartup from 'electron-squirrel-startup';

declare const CAPTURE_WINDOW_WEBPACK_ENTRY: string;
declare const CAPTURE_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

declare const LIBRARY_WINDOW_WEBPACK_ENTRY: string;
declare const LIBRARY_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

type CaptureSide = 'left' | 'right';

const CAPTURE_ICON_SIZE = 48;
const CAPTURE_EXPANDED_WIDTH = 360;
const CAPTURE_EXPANDED_HEIGHT = 240;

const HOVER_DELAY_MS = 250;
const HOVER_POLL_INTERVAL_MS = 50;
const HOVER_AFTER_DRAG_DELAY_MS = 500;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (squirrelStartup) {
  app.quit();
}

let captureWindow: BrowserWindow | null = null;
let libraryWindow: BrowserWindow | null = null;

let captureSide: CaptureSide = 'right';
let captureExpanded = false;
let captureDragging = false;

let hoverStartedAt: number | null = null;
let blockHoverUntil = 0;

let hoverMonitor: ReturnType<typeof setInterval> | null = null;

const clamp = (
  value: number,
  minimum: number,
  maximum: number,
): number => Math.min(Math.max(value, minimum), maximum);

const cursorIsInsideWindow = (window: BrowserWindow): boolean => {
  const cursor = screen.getCursorScreenPoint();
  const bounds = window.getBounds();

  return (
    cursor.x >= bounds.x &&
    cursor.x < bounds.x + bounds.width &&
    cursor.y >= bounds.y &&
    cursor.y < bounds.y + bounds.height
  );
};

const notifyCaptureSideChanged = (): void => {
  if (!captureWindow || captureWindow.isDestroyed()) {
    return;
  }

  captureWindow.webContents.send(
    'capture:side-changed',
    captureSide,
  );
};

const setCaptureExpanded = (expanded: boolean): void => {
  if (
    !captureWindow ||
    captureWindow.isDestroyed() ||
    captureExpanded === expanded
  ) {
    return;
  }

  const currentBounds = captureWindow.getBounds();
  const display = screen.getDisplayMatching(currentBounds);
  const { workArea } = display;

  const width = expanded
    ? CAPTURE_EXPANDED_WIDTH
    : CAPTURE_ICON_SIZE;

  const height = expanded
    ? CAPTURE_EXPANDED_HEIGHT
    : CAPTURE_ICON_SIZE;

  // Stage 02 keeps the capture position inside a vertical range
  // where the full expanded panel can remain visible.
  const maximumY =
    workArea.y + workArea.height - CAPTURE_EXPANDED_HEIGHT;

  const y = clamp(
    currentBounds.y,
    workArea.y,
    maximumY,
  );

  const x =
    captureSide === 'left'
      ? workArea.x
      : workArea.x + workArea.width - width;

  captureWindow.setBounds({
    x,
    y,
    width,
    height,
  });

  captureExpanded = expanded;
};

const snapCaptureWindowToNearestEdge = (): void => {
  if (!captureWindow || captureWindow.isDestroyed()) {
    return;
  }

  const bounds = captureWindow.getBounds();
  const display = screen.getDisplayMatching(bounds);
  const { workArea } = display;

  const distanceFromLeft = Math.abs(
    bounds.x - workArea.x,
  );

  const distanceFromRight = Math.abs(
    workArea.x +
      workArea.width -
      (bounds.x + bounds.width),
  );

  captureSide =
    distanceFromLeft <= distanceFromRight
      ? 'left'
      : 'right';

  const maximumY =
    workArea.y + workArea.height - CAPTURE_EXPANDED_HEIGHT;

  const y = clamp(
    bounds.y,
    workArea.y,
    maximumY,
  );

  const x =
    captureSide === 'left'
      ? workArea.x
      : workArea.x +
        workArea.width -
        CAPTURE_ICON_SIZE;

  captureExpanded = false;

  captureWindow.setBounds({
    x,
    y,
    width: CAPTURE_ICON_SIZE,
    height: CAPTURE_ICON_SIZE,
  });

  notifyCaptureSideChanged();
};

const startCaptureHoverMonitor = (): void => {
  if (hoverMonitor) {
    clearInterval(hoverMonitor);
  }

  hoverMonitor = setInterval(() => {
    if (
      !captureWindow ||
      captureWindow.isDestroyed() ||
      captureDragging
    ) {
      return;
    }

    if (Date.now() < blockHoverUntil) {
      return;
    }

    const cursorInside =
      cursorIsInsideWindow(captureWindow);

    if (cursorInside) {
      if (captureExpanded) {
        hoverStartedAt = null;
        return;
      }

      if (hoverStartedAt === null) {
        hoverStartedAt = Date.now();
        return;
      }

      if (
        Date.now() - hoverStartedAt >=
        HOVER_DELAY_MS
      ) {
        hoverStartedAt = null;
        setCaptureExpanded(true);
      }

      return;
    }

    hoverStartedAt = null;

    if (captureExpanded) {
      setCaptureExpanded(false);
    }
  }, HOVER_POLL_INTERVAL_MS);
};

const stopCaptureHoverMonitor = (): void => {
  if (!hoverMonitor) {
    return;
  }

  clearInterval(hoverMonitor);
  hoverMonitor = null;
};

const createCaptureWindow = (): BrowserWindow => {
  const display = screen.getPrimaryDisplay();
  const { workArea } = display;

  const maximumY =
    workArea.y + workArea.height - CAPTURE_EXPANDED_HEIGHT;

  const initialY = clamp(
    Math.round(
      workArea.y +
        (workArea.height - CAPTURE_ICON_SIZE) / 2,
    ),
    workArea.y,
    maximumY,
  );

  captureSide = 'right';
  captureExpanded = false;

  const window = new BrowserWindow({
    x:
      workArea.x +
      workArea.width -
      CAPTURE_ICON_SIZE,
    y: initialY,

    width: CAPTURE_ICON_SIZE,
    height: CAPTURE_ICON_SIZE,

    frame: false,
    resizable: false,
    movable: true,
    alwaysOnTop: true,

    webPreferences: {
      preload: CAPTURE_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  window.loadURL(CAPTURE_WINDOW_WEBPACK_ENTRY);

  window.on('will-move', () => {
    captureDragging = true;
    hoverStartedAt = null;
  });

  window.on('moved', () => {
    if (!captureDragging) {
      return;
    }

    captureDragging = false;

    snapCaptureWindowToNearestEdge();

    blockHoverUntil =
      Date.now() + HOVER_AFTER_DRAG_DELAY_MS;
  });

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
  if (
    libraryWindow &&
    !libraryWindow.isDestroyed()
  ) {
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
    stopCaptureHoverMonitor();
    captureWindow = null;
  });

  ipcMain.on('library:open', (event) => {
    if (
      !captureWindow ||
      event.sender !== captureWindow.webContents
    ) {
      return;
    }

    openLibraryWindow();
  });

  ipcMain.handle('capture:get-side', (event) => {
    if (
      !captureWindow ||
      event.sender !== captureWindow.webContents
    ) {
      throw new Error(
        'Unauthorized capture side request',
      );
    }

    return captureSide;
  });

  startCaptureHoverMonitor();

  app.on('activate', () => {
    if (
      !captureWindow ||
      captureWindow.isDestroyed()
    ) {
      captureWindow = createCaptureWindow();

      captureWindow.on('closed', () => {
        stopCaptureHoverMonitor();
        captureWindow = null;
      });

      startCaptureHoverMonitor();
    }
  });
});

app.on('window-all-closed', () => {
  stopCaptureHoverMonitor();

  if (process.platform !== 'darwin') {
    app.quit();
  }
});