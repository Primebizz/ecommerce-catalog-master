import { Component, inject, OnInit, signal } from '@angular/core';
import { CartItem, IModel } from '../../../Interface/model';
import { CartService } from '../../../core/Services/cart.service';
import { ProductService } from '../../../core/Services/product.service';
import { NavbarComponent } from "../../../layouts/navbar/navbar.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  product: IModel | undefined

  cartItems: IModel[] = [];
  total: number = 1;
  priceTotal: number = 0;
  localCart: any = JSON.parse(localStorage.getItem('product') || "[]");
//  localId = this.localCart[i]
  router = inject(Router)

  productService = inject(ProductService)
  cartService = inject(CartService)

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((items: any) => {
      this.cartItems = items;
      // this.getLocal();
      // this.priceTotal;
    });
    this.totalPrice()
    
  }

  totalPrice(){
    for(let i = 0; i <= this.localCart.length; i++){
      this.priceTotal += this.localCart[i].price;
      // console.log('This is the total price ' + this.priceTotal);
    }
    // let toLetter = JSON.stringify(this.total)
    //   let num = parseFloat(toLetter)
    //   if(!isNaN(num)){
    //     toLetter = num.toFixed(2)
    //   }
    // localStorage.setItem('total', JSON.stringify(toLetter));
      
      
  }

  getLocal(){
    this.localCart
    // window.location.reload()
  }

  removeCartItem(array: any, id: string){
    const index = array.findIndex((item: CartItem) => item.Id === id);
    if (index > -1) {
      array.splice(index, 1);
      localStorage.setItem('product', JSON.stringify(array));
      this.totalPrice()
      alert('Item removed from cart');
    } else {
      alert('Item not found in cart');
    }
    
  //   const array = this.localCart.filter((item: IModel) => {
  //     item.id == id
     
  //     console.log(this.localCart);
  // })
  // if(array){
  //   alert('Item removed from cart') 
  //   localStorage.setItem('product1', JSON.stringify(array))
  // }
  
}

}
