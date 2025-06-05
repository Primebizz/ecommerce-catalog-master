import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../Interface/model';
import { Environment } from '../../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(private http: HttpClient) { }

  getUserOrders(userId: string): Observable<Order[]>{
 return this.http.get<Order[]>(`${Environment.API_URL}orders/user/${userId}`);
  }

  getOrdersById(orderId: string): Observable<Order[]>{
  return this.http.get<Order[]>(`${Environment.API_URL}orders/${orderId}`);
  }

  placeOrdrer(order: Order): Observable<Order> {
    return this.http.post<Order>(`${Environment.API_URL}order`, order);
  }


}
