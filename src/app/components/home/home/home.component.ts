import { Component, inject, input } from '@angular/core';
import { UserService } from '../../auth/services/user.service';
import { Router, RouterLink } from '@angular/router';
import { UrlsNames } from '../../../models/shared';
import { FireAuthService } from '../../auth/services/fire-auth.service';
import { CropsComponent } from "../crops/crops.component";
import { HeroComponent } from "../hero/hero.component";
import { SliderComponent } from "../slider/slider.component";
import { RetailerService } from '../../auth/services/retailer.service';
import { ContactUsComponent } from "../contact-us/contact-us.component";
import { NavbarComponent } from "../../navbar/navbar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CropsComponent, HeroComponent, SliderComponent, ContactUsComponent, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  urlsNames = UrlsNames;
  constructor(){
  }
}
