import { inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  user,
  UserCredential,
} from '@angular/fire/auth';
import { SnackService } from '../../../services/snack.service';
import { logBody, regBody } from '../../../models/User';
import { FarmerService } from './farmer.service';
import { RetailerService } from './retailer.service';
// import { Departments, logBody, regBody, UserRoles } from '../../../models/User';

@Injectable({
  providedIn: 'root',
})
export class FireAuthService {
  private angularAuth = inject(Auth);
  private farmerService = inject(FarmerService);
  private retailerService = inject(RetailerService);

  user$ = user(this.angularAuth);
  currentUser$ = authState(this.angularAuth);

  registerFarmerWithFB(body: any): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.angularAuth,
      body.email,
      body.password
    ).then((res) => {
      this.farmerService.addFarmerProfile(res.user.uid, {
        userId: res.user.uid,
        fname: body.fname,
        lname: body.lname,
        email: body.email,
        personalID: body.personalID,
        phone: body.phone,
        password: body.password,
      });
    });
    return from(promise);
  }
  registerRetailerWithFB(body: any): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.angularAuth,
      body.email,
      body.password
    ).then((res) => {
      this.retailerService.addRetailerProfile(res.user.uid, {
        userId: res.user.uid,
        name: body.name,
        email: body.email,
        taxNumber: body.taxNumber,
        phone: body.phone,
        password: body.password,
      });
    });
    return from(promise);
  }
  loginAsFarmerWithFB(body: logBody): Observable<UserCredential> {
    return from(
      signInWithEmailAndPassword(this.angularAuth, body.email, body.password)
    );
  }
  loginAsRetailerWithFB(body: logBody): Observable<UserCredential> {
    return from(
      signInWithEmailAndPassword(this.angularAuth, body.email, body.password)
    );
  }
  // logout(): Observable<void> {
  //   this.farmerService.logout();
  //   return from(signOut(this.angularAuth));
  // }
}
