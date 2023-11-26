import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { IpcService } from '../../shared/services/ipc/ipc.service';
import { ElectronStoreService } from '../../shared/services/electron-store/electron-store.service';
import { CmdService } from '../../shared/services/cmd/cmd.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
      <div class="p-5">
          <div class="row">
              <div class="col">
                  <button (click)="test()" mat-button mat-raised-button color="primary">Test ICP!!</button>
              </div>
              <div class="col">
                  <button (click)="testStore()" mat-button mat-raised-button color="primary">Test Store
                  </button>
              </div>
              <div class="col">
                  <button (click)="executeCommand()" mat-button mat-raised-button color="primary">Test execute command
                  </button>
              </div>
              <div class="col">
                  <button (click)="testBatch()" mat-button mat-raised-button color="primary">Execute command Angular
                  </button>
              </div>
          </div>
      </div>
  `,
  styles: ``
})
export class HomeComponent implements OnDestroy {
  ipcService = inject(IpcService);
  store = inject(ElectronStoreService);
  cmdService = inject(CmdService);

  ngOnDestroy(): void {
    this.ipcService.removeAllListeners('message');
  }

  test(): void {
    this.ipcService.send('message', 'Hello from Angular');
    this.ipcService.on('reply', (event: any, arg: string) => {
      alert(arg);
      this.ipcService.removeAllListeners('reply');
    });
  }

  testStore(): void {
    this.store.set<{ message: string, key: number }>('hello', { message: 'hello world', key: 25 });
    const valueStored = this.store.get<{ message: string, key: number }>('hello');
    alert(valueStored.message);
  }

  executeCommand(): void {
    this.ipcService.send('execute-command', { option: '/K', command: 'dir' });
    this.ipcService.on('resp-execute-command', (event: any, arg: boolean) =>  {
      this.ipcService.removeAllListeners('resp-execute-command');
      if (arg) {
        alert('command Executed OK');
        return;
      }
      alert('Error executing command');
    });
  }

  testBatch(): void {
    this.cmdService.testProcess();
  }
}
