import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-rating',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css'
})
export class RatingComponent {

  faStar = faStar

  @Input() rating:number = 0;
  @Input() readonly: boolean = false
  @Output() ratingChange = new EventEmitter<number>();


  setRating(value: number){
    if(this.readonly) return
    this.rating = value;

    this.rating = value;
    this.ratingChange.emit(this.rating); // Emit the updated rating
  }

}
