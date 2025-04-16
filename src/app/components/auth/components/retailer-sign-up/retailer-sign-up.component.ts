import { Component, inject, signal } from '@angular/core';
import { SnackService } from '../../../../services/snack.service';
import { FireAuthService } from '../../services/fire-auth.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UrlsNames } from '../../../../models/shared';

@Component({
  selector: 'app-retailer-sign-up',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './retailer-sign-up.component.html',
  styleUrl: './retailer-sign-up.component.scss',
})
export class RetailerSignUpComponent {
  private authService = inject(FireAuthService);
  private snack = inject(SnackService);
  private router = inject(Router);
  retailerBody = signal({
    name: null,
    email: null,
    taxNumber: null,
    phone: null,
    password: null,
  });
  urlsNames = UrlsNames;

  signUp() {
    // console.log(this.retailerBody());
    this.authService.registerRetailerWithFB(this.retailerBody()).subscribe({
      next: (retailer) => {
        console.log(retailer);
        this.router.navigate([UrlsNames.root, UrlsNames.login]).then(() => {
          this.snack.success('Retailer Created Successfully');
        });
      },
      error: (err) => {
        this.snack.success(err.message);
      },
    });
  }
}
