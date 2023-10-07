import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm } from '../models/LoginForm';
import { Product } from '../models/product.model';
import { ProductService } from '../products/product.service';
import { LocalStorageService } from '../shared/localstor.service';
import { JwtResponse } from '../models/jwtReponse.model';
import { MessageService } from 'primeng/api';
import { LoaderComponent } from '../loader/loader.component';
import { SharedService } from '../shared.service';



 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent {
  
  username : string;
  password : string;
  loginForm : LoginForm = new LoginForm();
  userEmpty = false;
  passwordEmpty = false;
  errorArray: any []=  [];
   constructor(private sharedService : SharedService,private messageService: MessageService,private router : Router ,private localStorage: LocalStorageService, private http: HttpClient,private productService : ProductService){

   }
   addMessages() {
    this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
  } 
   onSubmit(){
    this.validate();
    if(!this.userEmpty && !this.passwordEmpty){
      this.sharedService.setLoaderState(true);
    this.productService.login(this.loginForm).subscribe(response => {
    console.log(response);
    localStorage.setItem("token",response.token);
     this.currentUser(response);
     this.errorArray = []
     this.sharedService.setLoaderState(false);
     this.messageService.add({ severity: 'success', summary: 'Sign in', detail: 'Login Successfully' });
     setTimeout(() => {
      this.router.navigate(['/'])
     }, 1000);

    },error => {
      // console.log(error);
      this.sharedService.setLoaderState(false);
      console.log(error,"errors")
      this.errorArray = [{ severity: 'error', summary: 'Error', detail: error?.error?.message }]
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.error?.message });
    })
  }
   }

   currentUser(jwtReponse : JwtResponse){
   console.log(jwtReponse)
    this.productService.currentUser(jwtReponse).subscribe(response=>{
      console.log(response);
      this.localStorage.setItem('customerId',response.customerId);
    },error => {
      console.log(error);
    })
   }
  

   validate(){
    if(!this.loginForm.username){
      this.userEmpty = true;
    }else {
      this.userEmpty = false;
    }
    if(!this.loginForm.password){
      this.passwordEmpty = true;
    }else {
      this.passwordEmpty = false;
    }
   }
}
