import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule],
  template: `
    <mat-toolbar color="primary">
        <span>Hello world!</span>
    </mat-toolbar>
  `,
  styles: ``
})
export class NavbarComponent {

}
