import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProdListTypeComponent } from '../../products/prod-list-type/prod-list-type.component';
import { ICat, IModel } from '../../../Interface/model';
import { ProductService } from '../../../core/Services/product.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProdListTypeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  productsServices = inject(ProductService)

  category: ICat[] = []

  ngOnInit(): void {
    // Initialization logic can go here
    console.log('Home component initialized');
    this.getCategory()

  }

  getCategory(){
    this.productsServices.getCategory().subscribe((res: ICat[]) => {
      this.category = res
      console.log(this.category);
    })
  }

  currentTab: boolean = false

}
