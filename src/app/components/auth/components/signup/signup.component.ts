import { Component } from '@angular/core';
import { FarmerSignUpComponent } from '../farmer-sign-up/farmer-sign-up.component';
import { RetailerSignUpComponent } from '../retailer-sign-up/retailer-sign-up.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FarmerSignUpComponent, RetailerSignUpComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {}
