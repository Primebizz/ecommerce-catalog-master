import { ProductService } from './../../Services/product.service';
import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { IModel, Model } from '../../Interface/model';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [NavbarComponent, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  productList: IModel [] = []
  addproducts: Model = new Model();

  productService = inject(ProductService)

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
      }
      
    })
  }

  deleteProd(id: string){
    this.productService.deleteProduct(id).subscribe((res: IModel) => {
      const isDelete = confirm('Are ou sure you want to delete Product?');
      if(isDelete){
        alert('Product Remove Successfully')
        this.getAllProducts()
      }
    })
  }
}
