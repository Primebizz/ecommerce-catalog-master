import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthServiceService } from '../../core/Services/auth-service.service';
import { ProductService } from '../../core/Services/product.service';
import { OrderServiceService } from '../../core/Services/order-service.service';
import { ApiResponse, CartItem, LineItem, Order } from '../../Interface/model';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{

  authService = inject(AuthServiceService);

  productService = inject(ProductService);

  orderService = inject(OrderServiceService);

  cartItems: LineItem[] = JSON.parse(localStorage.getItem('product') || "[]");

  user: any = []

  subtotal: number = 0;

  tax: number = 0;

  shippingFee: number = 20;

  total: number = 0;

  userId = '';

  newOrderObj: Order = new Order();


  ngOnInit(): void {
    this.authService.getUser().subscribe((res: ApiResponse) => {
                this.user = res.user
                this.userId = this.user._id
                this.checkoutForm = new FormGroup({
                  fullName: new FormControl(`${this.user.firstName} ${this.user.lastName}`),
                  address1: new FormControl(),
                  address2: new FormControl(),
                  city: new FormControl(),
                  zip: new FormControl(),
                  state: new FormControl(),
                  country: new FormControl(),
                  paymentMethod: new FormControl(),
                  cardNumber: new FormControl(),
                  expiry: new FormControl(),
                  cvc: new FormControl()
                })
    })

    this.getCartTotal()
    this.tax = 0.10 * this.subtotal;
    this.total = this.tax + this.shippingFee + this.subtotal;
      
  };

  checkoutForm = new FormGroup({
    fullName: new FormControl(`${this.user.firstName} ${this.user.lastName}`),
    address1: new FormControl(),
    address2:  new FormControl(),
    city: new FormControl(),
    zip: new FormControl(),
    state: new FormControl(),
    country: new FormControl(),
    paymentMethod: new FormControl(),
    cardNumber: new FormControl(),
    expiry: new FormControl(),
    cvc: new FormControl()
  });

    

  get fullName(){
   return this.checkoutForm.get('fullName')
  }

  get address1(){
   return this.checkoutForm.get('address1')
  }

  get address2(){
   return this.checkoutForm.get('address2')
  }

  get city(){
   return this.checkoutForm.get('city')
  }

  get zip(){
   return this.checkoutForm.get('zip')
  }

  get state(){
   return this.checkoutForm.get('state')
  }

  get country(){
   return this.checkoutForm.get('country')
  }

  get paymentMethod(){
   return this.checkoutForm.get('paymentMethod')
  }

  get cardNumber(){
   return this.checkoutForm.get('cardNumber')
  }

  get expiry(){
   return this.checkoutForm.get('expiry')
  }

  get cvc(){
   return this.checkoutForm.get('cvc')
  }

  

  placeOrder(){
    this.newOrderObj = {
        userId: this.userId,
        items: this.cartItems,
        shippingAddress: {
          line1: this.checkoutForm.get('address1')?.value,
          city: this.checkoutForm.get('city')?.value,
          state: this.checkoutForm.get('state')?.value,
          zip: this.checkoutForm.get('zip')?.value,
          country: this.checkoutForm.get('country')?.value,
        },
        paymentMethod: this.checkoutForm.get('paymentMethod')?.value,
        subtotal: this.subtotal,
        tax: this.tax,
        shippingFee: this.shippingFee,
        total: this.total,
    } as Order


    this.orderService.placeOrdrer(this.newOrderObj).subscribe((res: any) => {
      if(res){
        alert('Success')
        localStorage.removeItem('product')
      }
    })

  };

  getCartTotal(){
  for(let i = 0; i < this.cartItems.length; i++){
    let price = this.cartItems[i].quantity * this.cartItems[i].price
    this.subtotal += price;  
}
return this.subtotal;
}
}
