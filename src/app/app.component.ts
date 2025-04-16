import { Component, inject } from '@angular/core';
import { Analytics } from '@angular/fire/analytics';
import { Auth } from '@angular/fire/auth';
import { RouterOutlet } from '@angular/router';
import { of } from 'rxjs';
import { FireAuthService } from './components/auth/services/fire-auth.service';
import { UserService } from './components/auth/services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  auth = inject(Auth);
  analytics = inject(Analytics);
  private FireAuth = inject(FireAuthService);
  public userService = inject(UserService);
  ngOnInit(): void {
    this.FireAuth.user$.subscribe((user) => {
      if (user?.email) {
        this.userService.setUserFromFB(user.email);
      } else this.FireAuth.currentUser$.pipe(() => of(null));
    });
  }
}
