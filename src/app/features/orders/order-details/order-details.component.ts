import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ApiResponse, Order } from '../../../Interface/model';
import { AuthServiceService } from '../../../core/Services/auth-service.service';
import { OrderServiceService } from '../../../core/Services/order-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-details',
  imports: [CommonModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit{

  orderService = inject(OrderServiceService);

  userService = inject(AuthServiceService);

  user: any = [];

  orderList: Order[] = [];

  @Input() order!: Order;
  @Output() close = new EventEmitter<void>()

  ngOnInit(): void {

    this.orderService.getOrdersById(this.user._id).subscribe((res: any) => {
     this.orderList = res;
    })
      
  }

  onClose(){
    this.close.emit()
  }

  date = Date.now()

}
