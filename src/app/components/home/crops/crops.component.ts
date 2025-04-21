import { Component, inject, signal } from '@angular/core';
import { CropsService } from '../../../services/crops.service';
import { Auction } from '../../../models/crops';
import { DatePipe } from '@angular/common';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-crops',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './crops.component.html',
  styleUrl: './crops.component.scss',
})
export class CropsComponent {
  cropService = inject(CropsService);
  auctions = signal<Auction[]>([]);

  constructor() {
    this.getAllAuctions();
  }
  getAllAuctions() {
    this.cropService.getAllCrops().subscribe({
      next: (res) => {
        res.forEach((doc) => {
          console.log(doc.data());

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
        console.log(this.auctions());
      },
    });
  }
}
