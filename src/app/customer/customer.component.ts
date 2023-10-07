import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../models/customer.model';
import { MessageService } from 'primeng/api';
import { error } from 'jquery';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [MessageService]
})
export class CustomerComponent {
  title = 'E-Commerce';
  loadedPosts = [];
  isAdmin  = false;
  customer : Customer = new Customer();
  userEmpty : boolean;
  mobileNumberEmpty : boolean;
  emailEmpty : boolean;
  passwordEmpty : boolean;
  errorFlag = false;
  passwordAuthFlag : boolean;
  errorArray = [];

  constructor(private productService: ProductService,private messageService: MessageService,private http: HttpClient,private router: Router, public messageSevice : MessageService) {}

  
  onCreatePost() {
    
    this.productService.createCustomer(this.customer).subscribe(response => {
      console.log(response);
    // this.goToCustomerList();
    this.errorArray = [];
    this.messageService.add({ severity: 'success', summary: 'Sign up', detail: 'Account created Successfully' });
    setTimeout(() => {
      this.router.navigate(['/signin'])
     }, 1000);

  },error =>{
        this.errorArray = [];
        console.log(error,"errro");
        this.errorArray.push({ severity: 'error', summary: 'Sign up', detail: error.error[0]?.defaultMessage || error.error.message  })
  })
  }
    goToCustomerList(){
   this.router.navigate(['/customerList']);
 }
 asAdmin(event){
  console.log(event);
 }
 onSubmit(event){
  this.validation();
console.log(event)
if(!this.errorFlag){
  this.customer.role = 'ADMIN';
  this.onCreatePost();
}
 
 }
 validation(){
  this.userEmpty = false;
  this.emailEmpty = false;
  this.mobileNumberEmpty = false;
  this.passwordEmpty = false;
  if(this.customer.username && this.customer.email && this.customer.mobileNumber && this.customer.password){
    if(this.validatePassword(this.customer.password)){
      this.errorFlag = false;
      this.passwordAuthFlag = false;
    }else {
      this.passwordAuthFlag = true;
      this.errorFlag = true;
    }

  }else {
    if(!this.customer.username){
      this.userEmpty = true;
    }else {
      this.userEmpty = false;
    }
    if(!this.customer.email){
      this.emailEmpty = true;
    }else {
      this.emailEmpty = false;
    }
    if(!this.customer.mobileNumber){
      this.mobileNumberEmpty = true;
    }else {
      this.mobileNumberEmpty = false;
    }
    if(!this.customer.password){
      this.passwordEmpty = true;
    }else {
      this.passwordEmpty = false;
    }
  }
 }
 validatePassword(password: string): boolean {
  // Regular expressions to check for required elements
  const capitalRegex = /[A-Z]/;
  const smallRegex = /[a-z]/;
  const specialRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

  // Check if password meets all criteria
  const hasCapital = capitalRegex.test(password);
  const hasSmall = smallRegex.test(password);
  const hasSpecial = specialRegex.test(password);

  return hasCapital && hasSmall && hasSpecial;
}
}