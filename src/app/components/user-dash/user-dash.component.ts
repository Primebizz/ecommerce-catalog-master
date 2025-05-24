import { first } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthServiceService } from '../../Services/auth-service.service';
import { ApiResponse, IUser, User } from '../../Interface/model';
import { SettingsComponent } from '../settings/settings.component';
import { OrdersComponent } from '../orders/orders.component';
import { ProfileComponent } from '../profile/profile.component';
import { CartComponent } from '../cart/cart.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-dash',
  imports: [NavbarComponent, RouterOutlet, CommonModule, FormsModule, SettingsComponent, OrdersComponent, ProfileComponent, CartComponent],
  templateUrl: './user-dash.component.html',
  styleUrl: './user-dash.component.css'
})
export class UserDashComponent implements OnInit {

  router = inject(Router)

  userDetails: any = [];

  userService = inject(AuthServiceService)

  currentTab: string = 'dashboard'

  ngOnInit() : void {
    
    this.userService.getUser().subscribe((res: ApiResponse) => {
      this.userDetails = res.user
      console.log(`This is the res.data ${res.user}`);
      console.error(res);
      
    })
  }

  logOut(){
    const isLogout = confirm("You're leaving this page")
    if(isLogout){
    this.userService.logOut()
    this.router.navigateByUrl('auth-page')
    }
  }
}
