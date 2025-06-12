import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProdListTypeComponent } from '../../products/prod-list-type/prod-list-type.component';
import { ICat, IModel } from '../../../Interface/model';
import { ProductService } from '../../../core/Services/product.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProdListTypeComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  productsServices = inject(ProductService)

  category: ICat[] = []

  searchItems: any = []

  

  searchForm = new FormGroup({
    searchValue: new FormControl('')
  })

  get searchValue(){
    return this.searchForm.get('searchValue');
  }
  

  ngOnInit(): void {
    // Initialization logic can go here
    console.log('Home component initialized');
    this.getCategory()
    this.onGetSearched()

    console.log("This is the search items" + this.searchItems);
  }

  getCategory(){
    this.productsServices.getCategory().subscribe((res: ICat[]) => {
      this.category = res
      console.log(this.category);
    })
  }

  currentTab: boolean = false

  // fetchSearchValue() {
  //   const searchValue = this.serchForm.value.searchValue;
  //   if (searchValue) {
  //     this.productsServices.getSearchedProduct(searchValue).subscribe((res: any) => {
  //       this.searchItems = res;
  //     });
  //   } else {
  //     this.searchItems = [];
  //   }
  // }

  onGetSearched(){
    // debugger
    // document.getElementById('searchBar')?.addEventListener('keydown', () => {
    // const searchValue = this.serchForm.value.searchValue;
    // if (searchValue) {
    //   this.productsServices.getSearchedProduct({name: searchValue, page: 1}).subscribe((res: any) => {
    //     this.searchItems = res;
    //     console.log("This is the searchValue" + searchValue);
    //   });
    // } else {
    //   this.searchItems = [];
    // }
    //   })


    this.searchForm
    .get('searchValue')!
    .valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => term
        ? this.productsServices.getSearchedProduct({name: term, page: 1})
        : of([])
      )
    )
    .subscribe((results: IModel[]) => {
      this.searchItems = results
      console.log('This is the search result', results.map(item => item.name));
    });
  }

}
