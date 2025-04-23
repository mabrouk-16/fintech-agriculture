import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DwonloadPopupComponent } from '../dwonload-popup/dwonload-popup.component';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent {
  dialog = inject(MatDialog)

  openPopup(link:string) {
    this.dialog.open(DwonloadPopupComponent, {
      data: link,
      panelClass: 'appointment-popup',
      width: '400px',
    });
  }
}
