import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./components/auth/components/signup/signup.component').then(
        (m) => m.SignupComponent
      ),
  },
];
