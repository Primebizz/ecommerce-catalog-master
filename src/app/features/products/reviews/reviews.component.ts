import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../core/Services/product.service';
import { ApiResponse, IUser, Reviews } from '../../../Interface/model';
import { ActivatedRoute } from '@angular/router';
import { RatingComponent } from '../../../shared/rating/rating.component';
import { AuthServiceService } from '../../../core/Services/auth-service.service';

@Component({
  selector: 'app-reviews',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RatingComponent],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnInit {

  user: any = []
  userList: IUser[] = []

  productService = inject(ProductService)

  userService = inject(AuthServiceService)

  reviews: Reviews[] = []

  route = inject(ActivatedRoute)

  @Input('rate') rate: number = 0;


  ngOnInit(): void {
    this.getProdReviews()
            this.userService.getUser().subscribe((res: ApiResponse) => {
     this.user = res.user
    if (this.user?.firstName) {
     this.reviewFormG.get('author')?.setValue(this.user.firstName || 'Anonymous');
}
                
              
      this.reviewFormG = new FormGroup({
        author: new FormControl(this.user.firstName || ''), // Default to user's name if available
        rating: new FormControl(null),
        comment: new FormControl('')
      });

});
      
}

getProdReviews(){
  const id = String(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductReviews(id).subscribe((review) => {
      this.reviews = review.reverse();
    })
}

  reviewFormG: FormGroup = new FormGroup({
    author: new FormControl(this.user.firstName || 'Anonymous'), // Default to user's name if available
    rating: new FormControl(null),
    comment: new FormControl('')
  });

  get author() {
    return this.reviewFormG.get('author');
  }
  get rating() {
    return this.reviewFormG.get('rating');
  }
  get comment() {
    return this.reviewFormG.get('comment');
  }

  updateRating(newRating: number) {
    this.reviewFormG.get('rating')?.setValue(newRating);
  }

  submitReview() {
  const id = String(this.route.snapshot.paramMap.get('id'));
  this.productService.addProductReview(id, this.reviewFormG.value).subscribe((res) => {
    alert('Review added successfully');
    this.reviewFormG.reset();
    this.getProdReviews()
  })
}

deleteReview(reviewId: string){
  console.log(`This is the reviewId ${reviewId}`);
  const id = String(this.route.snapshot.paramMap.get('id'));
  this.productService.deleteReview(id, reviewId).subscribe((res: Reviews) => {
    const isDelete = confirm('Are you sure you want to delete this review?');
    if(isDelete){
    alert('Review Deleted')
    this.getProdReviews()
  }else{
  alert('There was an error deleting this product.')
}
  })

}

}
