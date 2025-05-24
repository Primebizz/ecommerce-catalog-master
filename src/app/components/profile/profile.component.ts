import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { AuthServiceService } from '../../Services/auth-service.service';
import { ApiResponse } from '../../Interface/model';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  user: any = []

  userService = inject(AuthServiceService)

  date = Date.now()

  ngOnInit(): void {
          this.userService.getUser().subscribe((res: ApiResponse) => {
            this.user = res.user
            console.log(`This is the res.data ${res.user}`);
            console.error(res);
            
          })
  }

}
