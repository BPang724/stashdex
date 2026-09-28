import { contextBridge, ipcRenderer } from 'electron';

type CaptureSide = 'left' | 'right';

contextBridge.exposeInMainWorld('stashdex', {
  openLibrary: (): void => {
    ipcRenderer.send('library:open');
  },

  getCaptureSide: (): Promise<CaptureSide> =>
    ipcRenderer.invoke('capture:get-side'),

  onCaptureSideChanged: (
    callback: (side: CaptureSide) => void,
  ): (() => void) => {
    const listener = (
      _event: Electron.IpcRendererEvent,
      side: CaptureSide,
    ): void => {
      callback(side);
    };

    ipcRenderer.on('capture:side-changed', listener);

    return () => {
      ipcRenderer.removeListener('capture:side-changed', listener);
    };
  },
});