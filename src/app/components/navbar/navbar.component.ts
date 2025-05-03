import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UrlsNames } from '../../models/shared';
import { FireAuthService } from '../auth/services/fire-auth.service';
import { RetailerService } from '../auth/services/retailer.service';
import { UserService } from '../auth/services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  userService = inject(UserService);
  private fireAuth = inject(FireAuthService);
  router = inject(Router);

  toggleSideBar = input(true);
  urlsNames = UrlsNames;
  constructor() {}
  logOut() {
    this.fireAuth.logout().subscribe((res) => {
      // console.log(res)
      this.router.navigate(['/', 'login']);
    });
  }
}
