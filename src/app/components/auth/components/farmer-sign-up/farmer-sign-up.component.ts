import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FireAuthService } from '../../services/fire-auth.service';
import { SnackService } from '../../../../services/snack.service';

@Component({
  selector: 'app-farmer-sign-up',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './farmer-sign-up.component.html',
  styleUrl: './farmer-sign-up.component.scss',
})
export class FarmerSignUpComponent {
  private authService = inject(FireAuthService);
  private snack = inject(SnackService);
  FarmerBody = signal({
    fname: null,
    lname: null,
    email: null,
    personalID: null,
    phone: null,
    password: null,
  });

  signUp() {
    // console.log(this.FarmerBody());
    this.authService.registerFarmerWithFB(this.FarmerBody()).subscribe({
      next: (farmer) => {
        console.log(farmer);
        this.snack.success('Farmer Created Successfully');
      },
      error: (err) => {
        this.snack.success(err.message);
      },
    });
  }
}
