import { ProductService } from '../../../core/Services/product.service';
import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../../../layouts/navbar/navbar.component";
import { ICat, IModel, Model } from '../../../Interface/model';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink, RouterLinkActive, FormsModule, AsyncPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  productList: IModel [] = []
  addproducts: Model = new Model();
  
  productService = inject(ProductService)

  category$: Observable<ICat[]> = this.productService.getCategory();

  typeList: ICat[] = []

  

  getAllProducts(){
    this.productService.getproduct().subscribe((products: any) => {
      this.productList = products
    })
  }

  ngOnInit(): void {
    this.getAllProducts()
  }

   addNewProduct(){
    
    this.productService.createProduct(this.addproducts).subscribe((res: Model[]) => {
      if(res){
        alert('Product Added')
        this.getAllProducts()
        this.addproducts = new Model(); // Reset the form
      }
      
    })
  }

  deleteProd(id: string){
    this.productService.deleteProduct(id).subscribe((res: IModel) => {
      // const isDelete = confirm('Are ou sure you want to delete Product?');
      // if(isDelete){
      //   alert('Product Remove Successfully')
        this.getAllProducts()
      // }
    })
  }

  getCategoryType(name: string){
    this.productService.getCategoryByType(name).subscribe((res: ICat[]) => {
  this.typeList = res
    })
  }
}
