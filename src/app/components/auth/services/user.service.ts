import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import {
  collection,
  CollectionReference,
  doc,
  Firestore,
  getDoc,
  getDocs,
} from '@angular/fire/firestore';
import { from, Observable, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SnackService } from '../../../services/snack.service';
import { environment } from '../../../../environment';
import { FarmerModel, RetailerModel } from '../../../models/User';
import { User } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../components/login/login.component';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private firestore = inject(Firestore);
  private http = inject(HttpClient);
  private snack = inject(SnackService);
  dilog = inject(MatDialog);

  // private authService = inject(AuthApiService);
  user: WritableSignal<FarmerModel | RetailerModel | null | undefined> =
    signal(null);
  farmer: WritableSignal<FarmerModel | null | undefined> = signal(null);
  retailer: WritableSignal<RetailerModel | null | undefined> = signal(null);
  usersCollections!: CollectionReference;

  constructor() {
    this.getUser();
  }

  setUserFromFB(email: string) {
    let found = false;
    return from(getDocs(collection(this.firestore, 'farmers')))
      .pipe(
        switchMap((res) => {
          res.forEach((doc) => {
            // console.log(doc.data());
            if ((doc.data() as FarmerModel).email == email) {
              // this.saveUser(doc.data());
              this.user.set({ ...doc.data() });
              this.farmer.set({ ...doc.data() });
              this.saveUser(doc.data());
              console.log(this.user());
              found = true;
            }
          });
          if (found) {
            return of();
          } else return from(getDocs(collection(this.firestore, 'retailers')));
        })
      )
      .subscribe({
        next: (res) => {
          res.forEach((doc) => {
            // console.log(doc.data());
            if ((doc.data() as RetailerModel).email == email) {
              this.saveUser(doc.data());
              this.user.set({ ...doc.data() });
              this.retailer.set({ ...doc.data() });
              this.saveUser(doc.data());
              // console.log(this.user());
            }
          });
        },
      });
  }
  openLoginPopup() {
    this.dilog.open(LoginComponent, {
      maxWidth: '456px',
    });
  }
  getUserProfile(id: string) {
    const ref = doc(this.firestore, 'farmers', id);
    return from(getDoc(ref));
  }

  saveUser(user: FarmerModel | RetailerModel | User | undefined) {
    // this.user?.set(user);
    // console.log(user);
    localStorage.setItem('user', JSON.stringify(user));
  }
  getUser() {
    const user = localStorage.getItem('user');
    if (user) {
      const currentUser = JSON.parse(user);
      this.user?.set(currentUser);
    }
    return user;
  }

  logout() {
    this.user.set(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.clear();
  }
  //  authUserProfile() {
  //   this.authService.user$.pipe(switchMap((user)=>{
  //     if (!user?.uid) {
  //       return of(null)
  //     }
  //     const ref = doc(this.firestore,'users',user.uid);
  //     return docData(ref) as Observable<UserProfile>
  //   }))
  // }

  // ==================================== profile settings==============================================

  uploadImageToCloud(data: any): Observable<any> {
    return this.http.post(
      `https://api.cloudinary.com/v1_1/${environment.cloudinaryConfig.CloudName}/image/upload`,
      data
    );
  }

  // updateProfileImageByFB(imgUrl: string) {
  //   this.updateUserProfile(this.user()?.userId || '', {
  //     ...this.user(),
  //     picture: imgUrl,
  //   }).subscribe(() => {
  //     this.setUserFromFB(this.user()?.userId || '');
  //     this.snack.success('Your Image Successfully Updated');
  //   });
  // }

  // updateProfileInfo(body: any) {
  //   this.updateUserProfile(this.user()?.userId || '', {
  //     ...this.user(),
  //     ...body,
  //   }).subscribe(() => {
  //     this.setUserFromFB(this.user()?.userId || '');
  //     this.snack.success('Your Information Successfully Updated');
  //   });
  // }
}
