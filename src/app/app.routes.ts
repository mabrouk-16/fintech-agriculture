import { Routes } from '@angular/router';
import { UrlsNames } from './models/shared';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: UrlsNames.login,
    pathMatch: 'full',
  },
  {
    path: `${UrlsNames.signUp}`,
    loadComponent: () =>
      import('./components/auth/components/signup/signup.component').then(
        (m) => m.SignupComponent
      ),
  },
  {
    path: `${UrlsNames.login}`,
    loadComponent: () =>
      import('./components/auth/components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: `${UrlsNames.home}`,
    loadComponent: () =>
      import('./components/home/home/home.component').then(
        (m) => m.HomeComponent
      ),
      canActivate:[authGuard]
  },
  {
    path: `${UrlsNames.profile}`,
    loadComponent: () =>
      import('./components/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
      canActivate:[authGuard]
  },
];
