import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../auth/services/user.service';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../../services/contact.service';
import { SnackService } from '../../../services/snack.service';
export interface Feedback {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  picture?: string;
}
@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {
  userService = inject(UserService);
  contactService = inject(ContactService);
  private snack = inject(SnackService);

  feedback = signal<Feedback>({
    name: '',
    email: '',
    phone: '',
    message: '',
    picture: '',
  });
  constructor() {
    setTimeout(() => {
      if (this.userService.farmer()) {
        this.feedback.set({
          name:
            this.userService.farmer()?.fname +
            ' ' +
            this.userService.farmer()?.lname,
          email: this.userService.farmer()?.email,
          phone: this.userService.farmer()?.phone,
          message: '',
          picture: this.userService.farmer()?.farmImages?.length
            ? this.userService.farmer()?.farmImages![0]
            : '',
        });
      } else if (this.userService.retailer()) {
        this.feedback.set({
          name: this.userService.retailer()?.name,
          email: this.userService.retailer()?.email,
          phone: this.userService.retailer()?.phone,
          message: '',
          picture: this.userService.retailer()?.img,
        });
      }
    }, 4000);
    this.contactService.getAllFeedbacks();
  }
  send() {
    console.log(this.feedback());
    this.contactService.addFeedback(this.feedback()).subscribe({
      next: (res) => {
        this.snack.success('Feedback Sent Successfully');
      },
      error: (err) => {
        this.snack.success(err.message);
      },
    });
  }
}
