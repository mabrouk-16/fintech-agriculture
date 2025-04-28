import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import {
  CollectionReference,
  doc,
  Firestore,
  getDoc,
  setDoc,
  collection,
  getDocs,
} from '@angular/fire/firestore';
import {} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SnackService } from '../../../services/snack.service';
import { environment } from '../../../../environment';
import { FarmerModel, RetailerModel } from '../../../models/User';

@Injectable({
  providedIn: 'root',
})
export class RetailerService {
  private firestore = inject(Firestore);
  private http = inject(HttpClient);
  private snack = inject(SnackService);

  // private authService = inject(AuthApiService);
  // user: WritableSignal<User | null | undefined> = signal(null);
  usersCollections!: CollectionReference;
  retailerList: WritableSignal<RetailerModel[]> = signal([]);

  constructor() {
    // this.getUser()
  }
  getRetailerProfile(id: string) {
    const ref = doc(this.firestore, 'retailers', id);
   return from(getDoc(ref))
  }
  getAllRetailers() {
    from(getDocs(collection(this.firestore, 'retailers'))).subscribe({
      next: (res) => {
        res.forEach((doc) => {
          if (doc.data() as RetailerModel) {
            this.retailerList().push({ ...doc.data() });
          }
        });
        // console.log(this.retailerList());
      },
    });
  }

  getUserProfile(id: string) {
    const ref = doc(this.firestore, 'users', id);
    return from(getDoc(ref));
  }

  saveUser(user: FarmerModel | RetailerModel | undefined) {
    // this.user?.set(user);
    localStorage.setItem('user', JSON.stringify(user));
  }
  // getUser() {
  //   const user = localStorage.getItem('user');
  //   if (user) {
  //     const currentUser = JSON.parse(user);
  //     this.user?.set(currentUser);
  //   }
  //   return user;
  // }

  addRetailerProfile(id: string, user: any) {
    // console.log(id);
    // console.log(user);
    const ref = doc(this.firestore, 'retailers', id);
    return from(setDoc(ref, user));
  }
  // updateUserProfile(id: string, user: User) {
  //   console.log(id);
  //   const ref = doc(this.firestore, 'users', id);
  //   return from(updateDoc(ref, { ...user }));
  // }
  logout() {
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
