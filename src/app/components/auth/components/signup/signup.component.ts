import { Component } from '@angular/core';
import { FarmerSignUpComponent } from "../farmer-sign-up/farmer-sign-up.component";
import { RetailerSignUpComponent } from "../retailer-sign-up/retailer-sign-up.component";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FarmerSignUpComponent, RetailerSignUpComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {



  move(){
    const loginText = document.querySelector('.title-text .login');
    const loginForm = document.querySelector('form.login');
    const loginBtn = document.querySelector('label.login');
    const signupBtn = document.querySelector('label.signup');
    const signupLink = document.querySelector('form .signup-link a');
    // signupBtn.onclick = () => {
    //   loginForm.style.marginLeft = '-50%';
    //   loginText.style.marginLeft = '-50%';
    // };
    // loginBtn.onclick = () => {
    //   loginForm.style.marginLeft = '0%';
    //   loginText.style.marginLeft = '0%';
    // };

  }
}
