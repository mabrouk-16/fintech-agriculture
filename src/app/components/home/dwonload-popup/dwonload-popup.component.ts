import { Component, inject } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import {
  MatDialog,
  MatDialogRef,
  MatDialogClose,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
@Component({
  selector: 'app-dwonload-popup',
  standalone: true,
  imports: [QRCodeModule],
  templateUrl: './dwonload-popup.component.html',
  styleUrl: './dwonload-popup.component.scss',
})
export class DwonloadPopupComponent {
  data = inject(MAT_DIALOG_DATA);
}
