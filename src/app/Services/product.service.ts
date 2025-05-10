import { IModel, Model } from './../Interface/model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../Environment/environment';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
    this.fetchProducts()
   };

  private productsSubject = new BehaviorSubject<IModel[]>([]);
  //  productsSubject: Observable<IModel[]> = new Observable<IModel[]>();
  products$ = this.productsSubject.asObservable();

  fetchProducts() {
    this.http.get<IModel[]>(Environment.API_URL).subscribe((products) => {
      this.productsSubject.next(products);
    });
  }

  getproduct(): Observable<IModel>{
    return this.http.get<IModel>(Environment.API_URL);
}

createProduct(obj: Model): Observable<Model[]>{
  return this.http.post<Model[]>('http://localhost:3000/product', obj);
}

  getProductById(id: number): Observable<IModel | undefined> {
    console.log('getProductById called with ID:', id);

    return this.products$.pipe(
      map((products) => {
        console.log('Products in map:', products); 

        const foundProduct = products.find((product) => product.id === id);
        console.log('Found product:', foundProduct); 

        return foundProduct;
      })
    )
      }
    
  }

