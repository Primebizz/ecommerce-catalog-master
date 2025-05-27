import { routes } from '../../../app.routes';
import { Component, inject, OnInit } from '@angular/core';
import { IModel } from '../../../Interface/model';
import { ProductService } from '../../../core/Services/product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prod-list-type',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './prod-list-type.component.html',
  styleUrl: './prod-list-type.component.css'
})
export class ProdListTypeComponent implements OnInit{

  productList: IModel[] = []

  productsServices = inject(ProductService)

  router = inject(Router)

  route = inject(ActivatedRoute)


  ngOnInit(): void {
    const type = String(this.route.snapshot.paramMap.get('type'));
    this.productsServices.getProductByCategoriesAndType(type).subscribe((product) => {
      this.productList = product;
      console.log('id for product details ', type);
    })
    this.getAllProducts()
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
      console.log('Type of product gotten ', type);
      console.log('Array of product gotten ', product);
    })
  }

}
