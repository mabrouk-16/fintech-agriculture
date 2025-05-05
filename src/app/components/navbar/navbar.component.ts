import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UrlsNames } from '../../models/shared';
import { FireAuthService } from '../auth/services/fire-auth.service';
import { RetailerService } from '../auth/services/retailer.service';
import { UserService } from '../auth/services/user.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
      this.router.navigate(['/', this.urlsNames.home]).then(() => {
        location.reload();
      });
    });
  }
}
