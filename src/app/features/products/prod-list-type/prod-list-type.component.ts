import { CartItem } from './../../../Interface/model';
import { routes } from '../../../app.routes';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ICat, IModel } from '../../../Interface/model';
import { ProductService } from '../../../core/Services/product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RatingComponent } from '../../../shared/rating/rating.component';
import { CartService } from '../../../core/Services/cart.service';

@Component({
  selector: 'app-prod-list-type',
  imports: [RouterLink, CommonModule, FormsModule, RatingComponent],
  templateUrl: './prod-list-type.component.html',
  styleUrl: './prod-list-type.component.css'
})
export class ProdListTypeComponent implements OnInit{

  localCart: any = JSON.parse(localStorage.getItem('product') || "[]");

  productList: IModel[] = []

  productsServices = inject(ProductService)

  cartService = inject(CartService)

  router = inject(Router)

  route = inject(ActivatedRoute)
  
    category: ICat[] = [];

    cartItems: CartItem[] = [];
  
    getCategory(){
      this.productsServices.getCategory().subscribe((res: ICat[]) => {
        this.category = res
      })
    }


  ngOnInit(): void {
    const type = String(this.route.snapshot.paramMap.get('type'));
    this.productsServices.getProductByCategoriesAndType(type).subscribe((product) => {
      this.productList = product;
    })
    this.cartService.getCartItems().subscribe((items: any) => {
      this.cartItems = items;
    })
    this.getAllProducts()
    this.getCategory()
  }

    deleteProd(id: string){
    this.productsServices.deleteProduct(id).subscribe((res: IModel) => {
      const isDelete = confirm('Are ou sure you want to delete Product?');
      if(isDelete){
        alert('Product Remove Successfully')
        this.getAllProducts()
      }
    })
  }

    getAllProducts(){
     const type = String(this.route.snapshot.paramMap.get('type'));
    this.productsServices.getProductByCategoriesAndType(type).subscribe((product) => {
      this.productList = product;
    })
  }

  getAverageRating(reviews: { rating: number }[]): number {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, curr) => acc + curr.rating, 0);
  return sum / reviews.length;
}

getCartTotal(){

}

checkout(){

}

}
