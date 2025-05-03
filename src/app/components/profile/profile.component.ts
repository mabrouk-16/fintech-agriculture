import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserService } from '../auth/services/user.service';
import { latLng, tileLayer } from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  userService = inject(UserService);
  ngAfterViewInit(): void {}
  // options = {
  //   layers: [
  //     tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //       attribution: '© OpenStreetMap contributors',
  //     }),
  //   ],
  //   zoom: 13,
  //   center: latLng(36.8065, 10.1815),
  // };
  ngOnInit() {
    setTimeout(() => {
      const map = L.map('map').setView([36.8065, 10.1815], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      if (this.userService.farmer()?.email) {
        console.log(this.userService.farmer());

        L.marker([
          this.userService.farmer()?.latitude || 0,
          this.userService.farmer()?.longitude || 0,
        ])
          .addTo(map)
          .bindPopup('Your Location')
          .openPopup();
      } else {
        L.marker([
          this.userService.retailer()?.lat || 0,
          this.userService.retailer()?.lon || 0,
        ])
          .addTo(map)
          .bindPopup('Your Location')
          .openPopup();
        console.log(this.userService.retailer());
      }
    }, 2000);
  }
}
