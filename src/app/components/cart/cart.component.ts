import { Component, inject, OnInit, signal } from '@angular/core';
import { IModel } from '../../Interface/model';
import { CartService } from '../../Services/cart.service';
import { ProductService } from '../../Services/product.service';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-cart',
  imports: [NavbarComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  product: IModel | undefined

  cartItems: IModel[] = [];
  total: number = 0;
  localCart = signal(JSON.parse(localStorage.getItem('product') || "[]"));
//  localId = this.localCart[i]

  productService = inject(ProductService)
  cartService = inject(CartService)

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((items: any) => {
      this.cartItems = items;
      this.total = this.cartService.calculateTotal();
    });
    this.localCart();
  }

  removeCartItem(array: any, id: number){
    const index = array.findIndex((item: IModel) => item.id === id);
    if (index > -1) {
      array.splice(index, 1);
      localStorage.setItem('product', JSON.stringify(array));
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
