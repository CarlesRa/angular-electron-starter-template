import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class IpcService {

  private ipcRenderer!: IpcRenderer;
  constructor() {
    this.setIpcRenderer();
  }

  private setIpcRenderer() {
    if (window.require) {
      try {
        this.ipcRenderer = window.require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('Electron IPC was not loaded');
    }
  }

  on(channel: string, listener: any): void {
    if (!this.ipcRenderer) { return; }
    this.ipcRenderer.on(channel, listener);
  }

  once(channel: string, listener: any): void {
    if (!this.ipcRenderer) { return; }
    this.ipcRenderer.once(channel, listener);
  }

  send(channel: string, ...args: any[]): void {
    if (!this.ipcRenderer) { return; }
    this.ipcRenderer.send(channel, args);
  }

  removeAllListeners(channel: string): void {
    if (!this.ipcRenderer) { return; }
    this.ipcRenderer.removeAllListeners(channel);
  }
}
