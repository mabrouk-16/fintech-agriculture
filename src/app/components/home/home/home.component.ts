import { Component } from '@angular/core';
import { UrlsNames } from '../../../models/shared';
import { CropsComponent } from '../crops/crops.component';
import { HeroComponent } from '../hero/hero.component';
import { SliderComponent } from '../slider/slider.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CropsComponent, HeroComponent, SliderComponent, ContactUsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  urlsNames = UrlsNames;
  constructor() {}
}
