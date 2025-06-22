declare var google: any;
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, ElementRef, inject, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../layouts/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ApiResponse, User } from '../../../Interface/model';
import { AuthServiceService } from '../../../core/Services/auth-service.service';

@Component({
  selector: 'app-signup-login',
  imports: [FormsModule, ReactiveFormsModule, RouterOutlet, CommonModule],
  templateUrl: './signup-login.component.html',
  styleUrl: './signup-login.component.css'
})
export class SignupLoginComponent implements OnInit{

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '1073068145028-u28rhigb9m6sh3n46vol527qidqdkf3l.apps.googleusercontent.com',
      callback: (res: any) => {
        
      }
    });

    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: 350
    })
  
  }

  isLogin: boolean = true;

  user: User[] = []

  userObj: User = new User();

  authService = inject(AuthServiceService)

  showPassword: boolean = false;

  router = inject(Router) 
    
  @ViewChild('confirmPassword') myConPassword: ElementRef | undefined;
  @ViewChild('password') myPassword: ElementRef | undefined;
  
  checkPassword(): any{
    if(this.myConPassword?.nativeElement.value === this.myPassword?.nativeElement.value) {
      return true
    }else{
      return false
    }
    
  }

  
  signUpForm: any = new FormGroup ({
    firstName: new FormControl('',{ validators:[Validators.minLength(3), Validators.maxLength(20), Validators.required] }),
    lastName: new FormControl('', { validators:[Validators.minLength(3), Validators.maxLength(20), Validators.required] } ),
    email: new FormControl('', { validators:[Validators.email, Validators.required] } ),
    phone: new FormControl('', { validators:[ Validators.minLength(10), Validators.maxLength(10), Validators.required] } ),
    password: new FormControl('', { validators:[Validators.minLength(8), Validators.required] } ),
    confirmPassword: new FormControl('', { validators: [Validators.minLength(8),  Validators.required] } ),
  })



  get firstName() {
    return this.signUpForm.get('firstName');
  }

  get lastName() {
    return this.signUpForm.get('lastName');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get phone() {
    return this.signUpForm.get('phone');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confrimPassword() {
    return this.signUpForm.get('confrimPassword');
  }



  cehckPassword(){
    const password = this.signUpForm.get('password').value;
    const confirmPassword = this.signUpForm.get('confrimPassword').value;
    if(password !== confirmPassword){
      const p = document.createElement('p');
      p.innerText = 'Password does not match';
      p.className = 'bg-red-200 text-red-800 py-2 px-4 rounded-md mt-2'; 
      document.getElementById('form')?.prepend(p);
  
      setTimeout(() => {
        p.style.display = 'none';
      }, 3000);
      this.signUpForm.get('confrimPassword').setErrors({ 'incorrect': true });
    }else{
      this.signUpForm.get('confrimPassword').setErrors(null);
    }
  }


  loginForm: any = new FormGroup ({
    loginEmail: new FormControl('', { validators: [Validators.email, Validators.required] }),
    loginPassword: new FormControl('', { validators: [Validators.minLength(8),  Validators.required] } ),
  })


  get loginEmail() {
    return this.loginForm.get('loginEmail');
  }

  get loginPassword() {
    return this.loginForm.get('loginPassword');
  }

  signUp(){
   
    this.authService.addNewUser(this.userObj).subscribe((res: User[]) => {
        // alert('User Created')
      const p = document.createElement('p');
      p.innerText = 'User created';
      p.className = 'bg-green-200 text-green-800 py-2 px-4 rounded-md mt-2'; 
      document.getElementById('form')?.prepend(p);
  
      setTimeout(() => {
        p.style.display = 'none';
      }, 3000);
      this.signUpForm.reset();
  
    }, error => {
      // alert('Api Error' + error.error);
      const p = document.createElement('p');
      p.innerText = `Error creating user. ${error.error}`;
      p.className = 'bg-red-200 text-red-800 py-2 px-4 rounded-md mt-2'; 
      document.getElementById('form')?.prepend(p);
  
      setTimeout(() => {
        p.style.display = 'none';
      }, 3000);
      
    })
  }

  login(){
    this.authService.logUser(this.userObj).subscribe((res: ApiResponse) => {
      const resStatus = res.status;
      console.log(resStatus);
      if(resStatus){
        localStorage.setItem('token', res.token);
        // localStorage.setItem('user', JSON.stringify(res.user));
        
        const p = document.createElement('p');
        p.innerText = `${res.message}`;
        p.className = 'bg-green-200 text-green-800 py-2 px-4 rounded-md mt-2';
        document.getElementById('form')?.prepend(p);
        setTimeout(() => {
          p.style.display = 'none';
          this.router.navigateByUrl('dashboard');
        }, 3000);
        
      }if(!resStatus){
        
        const p = document.createElement('p');
        console.log(`This is a failed message ${res.message}`);
        p.innerText = `${res.message}`;
        p.className = 'bg-red-200 text-red-800 py-2 px-4 rounded-md mt-2'; 
        document.getElementById('form')?.prepend(p);
    
        setTimeout(() => {
          p.style.display = 'none';
        }, 3000);
      }


      
  })
}




}
