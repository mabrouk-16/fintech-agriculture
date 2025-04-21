import { Timestamp } from "@angular/fire/firestore";

export interface Auction {
  auctionAt: Timestamp;
  crop: Crop;
  price: number;
  retailerId: string;
}
export interface Crop {
  cropID: number;
  cropImages: string[];
  cropName: string;
  cropPrice: number;
  cropQuantity: number;
  cropType: string;
  croplocation: string;
  auctionEnd: Timestamp;
  auctionStart: Timestamp;
  createdAt: Timestamp;
  farmerId: string;
  farmerImage: string;
//   front
start:Date;
end:Date;
at:Date;
}
