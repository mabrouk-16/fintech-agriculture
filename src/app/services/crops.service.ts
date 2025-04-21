import { inject, Injectable, signal } from '@angular/core';
import { Firestore, getDocs, collection } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { Auction } from '../models/crops';

@Injectable({
  providedIn: 'root'
})
export class CropsService {
 private firestore = inject(Firestore);
  Auctions = signal<Auction[]>([]);

  getAllCrops() {
    return from(getDocs(collection(this.firestore, 'auctions')));
  }
}
