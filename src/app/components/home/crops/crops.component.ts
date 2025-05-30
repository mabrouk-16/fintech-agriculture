import { Component, inject, signal } from '@angular/core';
import { CropsService } from '../../../services/crops.service';
import { Auction } from '../../../models/crops';
import { DatePipe } from '@angular/common';
import { Timestamp } from '@angular/fire/firestore';
import { RetailerService } from '../../auth/services/retailer.service';
import { RetailerModel } from '../../../models/User';
import { MatDialog } from '@angular/material/dialog';
import { CropPopupComponent } from './crop-popup/crop-popup.component';
import { UserService } from '../../auth/services/user.service';

@Component({
  selector: 'app-crops',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './crops.component.html',
  styleUrl: './crops.component.scss',
})
export class CropsComponent {
  cropService = inject(CropsService);
  userService = inject(UserService);
  auctions = signal<Auction[]>([]);
  dilog = inject(MatDialog);
  constructor() {
    this.getAllAuctions();
  }
  getAllAuctions() {
    this.cropService.getAllCrops().subscribe({
      next: (res) => {
        res.forEach((doc) => {
          // console.log(doc.data());

          this.auctions().push(doc.data() as Auction);
        });
        this.auctions.update((arr) => {
          arr.forEach((auction) => {
            auction.crop.start = new Timestamp(
              auction.crop.auctionStart.seconds,
              auction.crop.auctionStart.nanoseconds
            ).toDate();
            auction.crop.end = new Timestamp(
              auction.crop.auctionEnd.seconds,
              auction.crop.auctionEnd.nanoseconds
            ).toDate();
          });
          return [...arr];
        });
        // console.log(this.auctions());
      },
    });
  }
  openPopup(auction: Auction) {
    if (this.userService.user()?.email) {
      this.dilog.open(CropPopupComponent, {
        data: auction,
        maxWidth: '456px',
      });
    } else {
      this.userService.openLoginPopup();
    }
  }
}
