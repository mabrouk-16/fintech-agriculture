import { Component, inject, input } from '@angular/core';
import { UserService } from '../../auth/services/user.service';
import { Router } from '@angular/router';
import { UrlsNames } from '../../../models/shared';
import { FireAuthService } from '../../auth/services/fire-auth.service';
import { CropsComponent } from "../crops/crops.component";
import { HeroComponent } from "../hero/hero.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CropsComponent, HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  userService = inject(UserService);
  fireAuth = inject(FireAuthService);
  router = inject(Router);

  toggleSideBar = input(true);
  urlsNames = UrlsNames;
  logOut() {
    this.fireAuth.logout().subscribe((res) => {
      console.log(res)
      this.router.navigate(['/', 'login']);
    });
  }
}
