import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../core/Services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IModel, Model } from '../../../Interface/model';
import { CartService } from '../../../core/Services/cart.service';
import { CartComponent } from "../../cart/cart/cart.component";
import { NavbarComponent } from "../../../layouts/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit, OnDestroy{

  addproducts: Model = new Model();
  product: IModel | undefined;
  cartItems: IModel[] = [];
  total = signal(0);
  totalProduct: number = (0);
  localProdArr: any = [] 
  productsServices = inject(ProductService);
  cartService = inject(CartService)
  router = inject(Router)

  route = inject(ActivatedRoute)


  constructor(){
    //  this.emptArray.push(this.cartItems)
  }

  ngOnDestroy(): void {
      localStorage.removeItem('total');
  }

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.productsServices.getProductById(id).subscribe((product) => {
      this.product = product;
      console.log('id for product details ', id);
    })
    console.log(id);
    console.log('Product from service' , this.product);
    this.addTotal()
    // this.getProdPrice();
    // this.ngOnDestroy()
  }

 

  getProdPrice(){
    const currentPrice = localStorage.getItem('total');

    if(currentPrice){
      this.total.set(JSON.parse(currentPrice));
    }
    return this.total;
  }

  addToCart(){
    
    if(this.product){
      // const prodKey = 'product';
      // let _: any = this.product.price * this.totalProduct;
      const prod: any = this.cartService.addToCart(this.product);
      this.cartService.createCartItems(this.emptArray).subscribe((res: IModel[]) => {
        if(res){
      const p = document.createElement('p');
      p.innerText = 'Product Added to Cart';
      p.className = 'bg-green-200 text-green-800 py-2 px-4 rounded-md mt-2'; 
      document.getElementById('toast')?.prepend(p);
  
      setTimeout(() => {
        p.style.display = 'none';
      }, 3000);
          this.showToast()
          this.getFeedback()
          this.addTotal()
    localStorage.setItem('total', JSON.stringify(this.total));
    // this.localProdArr.push(this.product);
  

        let getLocalArr = JSON.parse(localStorage.getItem('product') || "[]");
      console.log('This is the typeof GetLocalArr' + typeof getLocalArr);
        getLocalArr.unshift(this.product)
        localStorage.setItem('product', JSON.stringify(getLocalArr));
      
 }

})

 } 

    // this.router.navigateByUrl('/cart')+  
  }  
  
  getFeedback(){
    const feedback = document.getElementById("feedback");
    const feedbackError = document.getElementById("feedbackError");

    // if(feedback?.style.display === 'none'){
      if (feedback) {
        feedback.style.display = 'block';
        feedback.classList.add('fade-in')
        setTimeout(() => {
                feedback.style.display = 'none'
                feedback.classList.add('fade-out')
              }, 3000);
      }
      

      
    // }
  }

  

  // localStorage.setItem('product', JSON.stringify(this.product)) || [];

  addNewProduct(){
    
    this.productsServices.createProduct(this.addproducts).subscribe((res: Model[]) => {
      if(res){
        alert('Success')
      }
      
    })
  }

  emptArray: IModel[] = [ ];

  // destroyLocalItemTotal(){
  //   if(window.location.reload())
  // }


  
  createOrder(){
   
      // this.cartService.createCartItems(this.emptArray).subscribe((res: IModel) => {
      //   if(res.id){
      //     alert('Added successfully')
      //   }
      // })
      console.log('Hello');
    }

    productIncrease(){
      this.totalProduct++;
    }

    productDecrease(){
      if(this.totalProduct !== 0){
        this.totalProduct--;
      }else{
        // const disable = document.getElementById('_disable');
        // disable?.classList.toggle('none');
      }
    }
    
    checkout(){
      
    }

    showToast(){
      const toast = document.getElementById("toastt");
      if (toast) {
        toast.style.display = 'block';
        toast.classList.add('fade-in');
        setTimeout(() => {
          toast.style.display = 'none';
          toast.classList.add('fade-out');
        }, 3000);
      }
    }

      addToWishlist(){
        const wishlist = document.getElementById("wishlist");
        if (wishlist) {
          wishlist.style.display = 'block';
          wishlist.classList.add('fade-in');
          setTimeout(() => {
            wishlist.style.display = 'none';
            wishlist.classList.add('fade-out');
          }, 3000);
        }
      }
    
  

  // getProductsDetails(){
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //   this.productsServices.getProductById(id).subscribe((product) => {
  //     this.product = product;
  //   })
  // }

  
  
  addTotal(){
    if(this.product){
       let _: any = this.totalProduct;
    const totalItems: number = this.cartService.calculateTotal();
     this.total.update(() =>  totalItems * _);
    }
   
    }



}
