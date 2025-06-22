import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ICat, IModel } from '../../../Interface/model';
import { ProductService } from '../../../core/Services/product.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  productsServices = inject(ProductService)

  category: ICat[] = []

  searchItems: IModel[] = []

  searchValue = '';

  showSuggestions: boolean = false;

  filtersOpen:boolean = false;

  hotPicks: IModel[] = [];

  discoveries: any = [{

  }];

  flashSales: any = [{

  }];

  

  searchForm = new FormGroup({
    searchInput: new FormControl('')
  })

  get searchInput(){
    return this.searchForm.get('searchInput');
  }
  

  ngOnInit(): void {
    this.getCategory();
    this.hotPick();
    this.searchForm.get('searchInput')!
      .valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.searchValue = value ?? '';
        this.fetchData();
      });
  }

  getCategory(){
    this.productsServices.getCategory().subscribe((res: ICat[]) => {
      this.category = res
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
    // this.searchValue = this.searchForm.value.searchInput ?? '';
    // this.fetchData();
    // console.log("This is the searchValue " + this.searchValue);
    // if (searchValue) {
    //   this.productsServices.getSearchedProduct({name: searchValue, page: 1}).subscribe((res: any) => {
    //     this.searchItems = res;
    //     console.log("This is the searchValue" + searchValue);
      // });
    // } else {
    //   this.searchItems = [];
    // }
      // })


    // this.searchForm
    // .get('searchInput')!
    // .valueChanges
    // .pipe(
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   switchMap((term) => term
    //     ? this.productsServices.getSearchedProduct(this.searchValue)
    //     : of([])
    //   )
    // )
    // this.fetchData()
  }

  fetchData(){
    this.productsServices.getSearchedProduct(this.searchValue).subscribe((res: IModel[]) => {
      this.searchItems = res;
    })
  }

  focusNextSuggestion(){

  }

  hideSuggestions(){

  }

  scrollLeft(item: string){}
  scrollRight(item: string){}
  toggleFilters(){}

  hotPick(){
    
    this.productsServices.getHotPicks().subscribe((res: IModel[]) => {
      this.hotPicks = res;
      console.log('This is the hotPicks ', this.hotPicks);
    })
  }
}
