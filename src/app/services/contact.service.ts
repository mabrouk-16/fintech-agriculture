import { inject, Injectable, signal } from '@angular/core';
import {
  Firestore,
  getDocs,
  collection,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import { from } from 'rxjs';
export interface Feedback {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  picture?: string;
}
@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private firestore = inject(Firestore);
  feedbacks = signal<Feedback[]>([]);

  getAllFeedbacks() {
    return from(getDocs(collection(this.firestore, 'feedback'))).subscribe({
      next: (res) => {
        res.forEach((doc) => {
          // console.log(doc.data());
          this.feedbacks().push(doc.data() as Feedback);
        });
      },
    });
  }
  addFeedback(feedback: Feedback) {
    const ref = doc(
      this.firestore,
      'feedback',
      (Math.random() * 1000).toString()
    );
    return from(setDoc(ref, feedback));
  }
}
