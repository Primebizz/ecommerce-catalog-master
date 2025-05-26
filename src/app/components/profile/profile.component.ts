import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs';
import { AuthServiceService } from '../../Services/auth-service.service';
import { ApiResponse, IUser, User } from '../../Interface/model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  user: any = []

  userLsit: IUser[] = []

  userObj: User = new User()

  userService = inject(AuthServiceService)

  date = Date.now()

  editProfile: boolean = false;

  ngOnInit(): void {
          this.userService.getUser().subscribe((res: ApiResponse) => {
            this.user = res.user
            console.log(`This is the res.data ${res.user}`);
            console.error(res);
            
          });

          this.userObj = new User({
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            email: this.user.email,
            phone: this.user.phone,
            dateOfBirth: this.user.dateOfBirth,
          })
  }

  onUpdate(){
    const update = confirm('Is the information okay?');
    if(update){
      this.userService.updateUser(this.user._id, this.userObj).subscribe((res: ApiResponse) => {
        alert('Profile Successfully Updated!')
      })
    }else {
      console.error('Error updating profile:');
      alert('Failed to update profile. Please try again later.');
    }
  }

}
