import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { ProductService } from 'src/app/products/product.service';
import { FetchCustomerListComponent } from '../fetch-customer-list/fetch-customer-list.component';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {
id: number;
  customer : Customer = new Customer();
  constructor(private productService : ProductService,
    private route:ActivatedRoute, private router : Router){

  }
  
   ngOnInit(): void {
    console.log(this.customer);
     this.id = this.route.snapshot.params['id'];
    this.productService.getCustomerById(this.id).subscribe(data =>{
      this.customer = data;
      console.log(data);
    },error => console.log(error));
    
   }
 


 onSubmit(){
  
 this.productService.updateCustomer(this.id,this.customer).subscribe(data => {

console.log(data);
this.goToCustomerList();
 },error => console.log(error));
 }
 goToCustomerList(){
  this.router.navigate(['/customerList']);
}




}
