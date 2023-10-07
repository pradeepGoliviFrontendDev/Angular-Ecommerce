import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { ProductService } from 'src/app/products/product.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit{
  id : number;
  customer : Customer; 
  constructor(private route: ActivatedRoute,private productService: ProductService){
    
  }
  ngOnInit() : void {
    this.id = this.route.snapshot.params['id'];
    this.customer = new Customer();
    this.productService.getCustomerById(this.id).subscribe(data =>{
      this.customer = data;
    })
  }
 

}
