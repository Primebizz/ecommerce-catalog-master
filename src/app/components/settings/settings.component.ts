import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthServiceService } from '../../Services/auth-service.service';
import { ApiResponse } from '../../Interface/model';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {

    user: any = []

  settings: any = []

  userService: any = inject(AuthServiceService)

  date = Date.now()

  ngOnInit(): void {
          this.userService.getUser().subscribe((res: ApiResponse) => {
            this.user = res.user
            console.log(`This is the res.data ${res.user}`);
            console.error(res);
            
          })
  }

  toggleTwoFactor(){

  }

  changePassword(){

  }

  saveSettings(){

  }

}
