import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reviews',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {

  reviewFormG: FormGroup = new FormGroup({
    name: new FormControl(''),
    rating: new FormControl(0),
    comment: new FormControl('')
  });

  reviews: any[] = [
    {
      name: 'John Doe',
      rating: 5,
      comment: 'Great product! Highly recommend it.',
      date: new Date('2023-10-01')
    },
    {
      name: 'Jane Smith',
      rating: 4,
      comment: 'Good quality, but a bit expensive.',
      date: new Date('2023-10-02')
    },
    {
      name: 'Alice Johnson',
      rating: 3,
      comment: 'Average experience, could be better.',
      date: new Date('2023-10-03')
    }
  ];
  submitReview() {
    const name = this.reviewFormG.get('name')?.value;
    const rating = this.reviewFormG.get('rating')?.value;
    const comment = this.reviewFormG.get('comment')?.value;
    if (name && rating && comment) {
      const newReview = {
        name,
        rating,
        comment,
        date: new Date()
      };
      this.reviews.push(newReview);
      this.reviewFormG.reset({ name: '', rating: 0, comment: '' }); // Reset form
    } else {
      alert('Please fill in all fields.');
    }
  }

}
