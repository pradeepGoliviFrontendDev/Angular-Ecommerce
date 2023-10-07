import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { ProductService } from 'src/app/products/product.service';
@Injectable()
@Component({
  selector: 'app-fetch-customer-list',
  templateUrl: './fetch-customer-list.component.html',
  styleUrls: ['./fetch-customer-list.component.css']
})
export class FetchCustomerListComponent implements OnInit{
  customers : Customer [] = [];
  constructor(private productService : ProductService,private router: Router) {

  }
 ngOnInit(): void {
   this.getCustomers()
 }
 private getCustomers(){
  this.productService.getCustomerList().subscribe(data => {
    this.customers = data;
  })
 }
 public customerId : number;
 getCustomerId(customerId : number){
   this.customerId = customerId;
 }
 
deleteCustomer(id : number){
  this.productService.deleteCustomer(id).subscribe(data =>{
    console.log(data);
    this.getCustomers();
  })
  this.getCustomers();
}
goToCustomerList(){
  this.router.navigate(['/customerList']);
}

customerDetails(id : number){

}

}
