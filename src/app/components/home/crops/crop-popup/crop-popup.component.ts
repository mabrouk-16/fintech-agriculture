import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Auction } from '../../../../models/crops';
import { DatePipe } from '@angular/common';
import { RetailerService } from '../../../auth/services/retailer.service';
import { RetailerModel } from '../../../../models/User';

@Component({
  selector: 'app-crop-popup',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './crop-popup.component.html',
  styleUrl: './crop-popup.component.scss',
})
export class CropPopupComponent {
  retailerService = inject(RetailerService);

  public data: Auction = inject(MAT_DIALOG_DATA);
  retailer = signal<RetailerModel | undefined>(undefined);
  constructor() {
    // console.log(this.data);
    this.getRetailer();
  }
  getRetailer() {
    this.retailerService
      .getRetailerProfile(this.data.retailerId)
      .subscribe((res) => {
        this.retailer.set(res.data() as RetailerModel);
      });
  }
}
