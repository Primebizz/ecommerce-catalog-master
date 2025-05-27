import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-orders',
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

    order: any ={
    firstName: '',
    lastName: '',

  }

  user: any ={
    firstName: '',
    lastName: ''
  }

  date = Date.now()

  viewOrder(order: string){

  }

}
