import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { IModel, Model } from '../Interface/model';
import { Environment } from '../Environment/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  private cartItemsSubject = new BehaviorSubject<IModel[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(product: IModel) {
    const currentItems = this.cartItemsSubject.value;
    this.cartItemsSubject.next([...currentItems, product]);
  }

  // private cartItems = signal<IModel[]>([]);/

  // addToCart(obj: IModel){
  //   const currentItems = this.cartItems.update((value) => [...value, obj]);
  //   console.log('This is the currentItem in cart service: ' + currentItems);
  //   return currentItems;
  // }

  removeFromCart(id: number){
    return this.http.delete(Environment.API_URL + id);
  }

  getCartItems(){
    return this.http.get(Environment.API_URL);
  }

  // calculateTotal(){
  //   return this.cartItems()
  // }

  calculateTotal(): number {
    return this.cartItemsSubject.value.reduce((total, product) => total + product.price, 0);
  }


  createCartItems(obj: IModel[]){
   return this.http.post<IModel[]>(`${Environment.cart_url}`, obj)
  }

}
