import { Component, inject, OnInit, signal } from '@angular/core';
import { IModel } from '../../Interface/model';
import { CartService } from '../../Services/cart.service';
import { ProductService } from '../../Services/product.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { Router } from '@angular/router';

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
  priceTotal: any = localStorage.getItem('total');
  localCart: any = signal(JSON.parse(localStorage.getItem('product') || "[]"));
//  localId = this.localCart[i]
  router = inject(Router)

  productService = inject(ProductService)
  cartService = inject(CartService)

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((items: any) => {
      this.cartItems = items;
      this.total = this.cartService.calculateTotal();
      this.router.navigateByUrl('/cart')
      this.getLocal();
      this.totalPrice();
      this.total
    });
    
  }

  totalPrice(){
    for(let i = 0; i < this.localCart().length; i++){
      this.total += this.localCart()[i].price;
    }
    // let toLetter = JSON.stringify(this.total)
    //   let num = parseFloat(toLetter)
    //   if(!isNaN(num)){
    //     toLetter = num.toFixed(2)
    //   }
    // localStorage.setItem('total', JSON.stringify(toLetter));
      console.log('This is the total price ' + this.total);
      
  }

  getLocal(){
    this.localCart()
    // window.location.reload()
  }

  removeCartItem(array: any, id: string){
    const index = array.findIndex((item: IModel) => item._id === id);
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
