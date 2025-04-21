import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FireAuthService } from '../../services/fire-auth.service';
import { SnackService } from '../../../../services/snack.service';
import { Router, RouterLink } from '@angular/router';
import { UrlsNames } from '../../../../models/shared';
import { user } from '@angular/fire/auth';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(FireAuthService);
  private userService = inject(UserService);
  private snack = inject(SnackService);
  private router = inject(Router);
  loginBody = signal({
    email: null,
    password: null,
  });

  urlsNames = UrlsNames;

  login() {
    // console.log(this.loginBody());

    this.authService.login(this.loginBody()).subscribe({
      next: (farmer) => {
        this.userService.saveUser(farmer.user);
        this.router.navigate([UrlsNames.root, UrlsNames.home]).then(() => {
          this.snack.success('LoggedIn Successfully');
        });
      },
      error: (err) => {
        this.snack.success(err.message);
      },
    });
  }
}
