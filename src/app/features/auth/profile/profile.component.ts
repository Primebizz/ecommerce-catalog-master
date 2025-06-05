import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs';
import { AuthServiceService } from '../../../core/Services/auth-service.service';
import { ApiResponse, IUser, User } from '../../../Interface/model';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
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

          this.profileForm = new FormGroup({
    firstName: new FormGroup(''),
    lastName: new FormGroup(this.user.lastName),
    email: new FormGroup(''),
    phone: new FormGroup(''),
    dateOfBirth: new FormGroup(''),
  });
  }

  profileForm: FormGroup = new FormGroup({
    firstName: new FormGroup(''),
    lastName: new FormGroup(''),
    email: new FormGroup(''),
    phone: new FormGroup(''),
    dateOfBirth: new FormGroup(''),
  });


  get firstName() {
    return this.profileForm.get('firstName');
  }
  get lastName() {
    return this.profileForm.get('lastName');
  }
  get email() {
    return this.profileForm.get('email');
  }
  get phone() {
    return this.profileForm.get('phone');
  }

  get dateOfBirth() {
    return this.profileForm.get('dateOfBirth');
  }


  onUpdate(){
    const update = confirm('Is the information okay?');
    if(update){
      this.userService.updateUser(this.user._id, this.profileForm.value).subscribe((res: ApiResponse) => {
        alert('Profile Successfully Updated!')
      })
    }else {
      console.error('Error updating profile:');
      alert('Failed to update profile. Please try again later.');
    }
  }

}
