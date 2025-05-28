import { ICat, IModel, Model } from '../../Interface/model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../Environment/environment';
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
    this.http.get<IModel[]>(`${Environment.API_URL}products`).subscribe((products) => {
      this.productsSubject.next(products);
    });
  }

  getproduct(): Observable<IModel>{
    return this.http.get<IModel>(`${Environment.API_URL}products`);
}

createProduct(obj: Model): Observable<Model[]>{
  return this.http.post<Model[]>('http://localhost:3000/product', obj);
}

deleteProduct(id: string): Observable<IModel>{
  return this.http.delete<IModel>(`${Environment.API_URL}product/${id}`)
}

  getProductById(id: string): Observable<IModel | undefined> {
    console.log('getProductById called with ID:', id);

    return this.products$.pipe(
      map((products) => {
        console.log('Products in map:', products); 

        const foundProduct = products.find((product) => product._id === id);
        console.log('Found product:', foundProduct); 

        return foundProduct;
      })
    )
      }

    getProductByCategoriesAndType(type: string): Observable<IModel[]> {
        console.log('getProductByCategoriesAndType called with type:', type);
    
        return this.products$.pipe(
          map((products) => {
            console.log('Products in map:', products); 
    
            const prodTypes = products.filter((product) => product.type === type);
            console.log('Found products:', prodTypes); 
    
            return prodTypes;
          })
        );
    }

    getCategory(): Observable<ICat[]>{
      return this.http.get<ICat[]>(`${Environment.CATEGORY_URL}`);
    }

    getCategoryByType(name: string): Observable<ICat[]> {
      return this.getCategory().pipe(
        map(categories => {
         categories = categories.filter(category => category.name === name);
          console.log('Filtered categories:', categories);
          return categories;
        })
      );
    }
    
  }

