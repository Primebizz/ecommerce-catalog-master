import { RatingComponent } from './../../../shared/rating/rating.component';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthServiceService } from '../../../core/Services/auth-service.service';
import { ApiResponse } from '../../../Interface/model';
import { SettingsComponent } from '../settings/settings.component';
import { OrdersComponent } from '../../orders/orders/orders.component';
import { ProfileComponent } from '../profile/profile.component';
import { CartComponent } from '../../cart/cart/cart.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping, faCoffee, faLeftRight, faList, faPortrait, faRightToBracket, faSliders, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-dash',
  imports: [RouterOutlet, CommonModule, FormsModule, SettingsComponent, OrdersComponent, ProfileComponent, CartComponent, FontAwesomeModule],
  templateUrl: './user-dash.component.html',
  styleUrl: './user-dash.component.css'
})
export class UserDashComponent implements OnInit {

  faCoffee = faCoffee;
  faBracket = faRightToBracket
  faOrder = faList
  faCart = faCartShopping
  faProfile = faUser
  faSetting = faSliders


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
