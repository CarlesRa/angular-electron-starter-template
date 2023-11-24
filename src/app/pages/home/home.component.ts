import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { IpcService } from '../../shared/services/ipc/ipc.service';
import { ElectronStoreService } from '../../shared/services/electron-store/electron-store.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <div class="p-5">
        <button (click)="ping()" mat-button mat-raised-button color="primary">Test ICP!</button>
    </div>
  `,
  styles: ``
})
export class HomeComponent {
  ipcService = inject(IpcService);
  store = inject(ElectronStoreService);

  ping(): void {
    this.store.set<string>('hello', 'hello world');
    this.ipcService.send('message', 'Hello neeeen');
    this.ipcService.on('reply', (event: any, arg: string) => {
      alert(arg);
    });
    const valueStored = this.store.get<string>('hello');
    console.log(valueStored);
  }
}
