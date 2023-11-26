import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CmdService {
  private cmd!: any;
  constructor() { this.setExec() }

  private setExec(): void {
    if (window.require) {
      try {
        this.cmd = window.require('child_process')
      } catch (e) {
        throw(e);
      }
    } else {
      console.warn('Electron child-process was not loaded');
    }
  }

  testProcess(): void {
    this.cmd.exec(`start cmd /K dir`);
  }
}
