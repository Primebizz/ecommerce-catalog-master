import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthServiceService } from '../../core/Services/auth-service.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightFromBracket, faUserCircle, } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  userService = inject(AuthServiceService)

  router = inject(Router)

  faLogin = faRightFromBracket
  faDash = faUserCircle

  logOut() {
    const isLogout = confirm("You're leaving this page")
    if(isLogout){
    this.userService.logOut()
    this.router.navigateByUrl('auth-page')
    }
  }
}
