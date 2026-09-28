import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('stashdex', {
  openLibrary: (): void => {
    ipcRenderer.send('library:open');
  },
});