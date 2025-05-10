import { ProductService } from './../../Services/product.service';
import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { IModel } from '../../Interface/model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [NavbarComponent, RouterLink, RouterLinkActive],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  productList: IModel [] = []

  productService = inject(ProductService)

  getAllProducts(){
    this.productService.getproduct().subscribe((products: any) => {
      this.productList = products
    })
  }

  ngOnInit(): void {
    this.getAllProducts()
  }
}
