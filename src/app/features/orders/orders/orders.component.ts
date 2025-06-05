import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { OrderServiceService } from '../../../core/Services/order-service.service';
import { ApiResponse, Order, User } from '../../../Interface/model';
import { AuthServiceService } from '../../../core/Services/auth-service.service';

@Component({
  selector: 'app-orders',
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{

  orderService = inject(OrderServiceService);

  userService = inject(AuthServiceService);

  user: any = [];

  orderList: Order[] = [];

  ngOnInit(): void {

    this.userService.getUser().subscribe((res: ApiResponse) => {
        this.user = res.user;
        console.log(`This is the user:`, this.user);
        this.getOrders();
        console.error('Failed to fetch user:', res.message);
    })
      
  }

  getOrders(){
    this.orderService.getUserOrders(this.user._id).subscribe((res: any) => {
      if(res){
        this.orderList = res;
        console.log(`This is the order list:`, this.orderList);
      } else {
        console.error('Failed to fetch orders:', res.message);
      }
    })
  }

  date = Date.now()

  viewOrder(order: string){

  }

}
