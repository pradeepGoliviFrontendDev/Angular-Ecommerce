import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/models/address.model';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/products/product.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  id : number;
  customerId : number;
  customerAddresses : Address [] = []
  constructor(private productService : ProductService,
    private router : ActivatedRoute,private routerLink : Router, private sharedService: SharedService){}
  ngOnInit(): void {
    this.getAllAddress();
  }
  getAllAddress(){
    this.customerAddresses = [];
    const value = localStorage.getItem('customerId');
    this.customerId = JSON.parse(value);
    this.sharedService.setLoaderState(true);
    this.productService.getAllAddress(this.customerId).subscribe(response =>{
      let defaultAddress = null;

      for (const element of response) {
        if (element.setDefault === true) {
          defaultAddress = element;
          break;
        }
      }
      this.customerAddresses.push(defaultAddress);
      response.forEach(element =>{
        if(element.setDefault == false){
          this.customerAddresses.push(element);
        }
      })
      console.log(this.customerAddresses);
      this.sharedService.setLoaderState(false);
    },error =>{
      this.sharedService.setLoaderState(false);
    })
  }
  remove(id){
    const value = localStorage.getItem('customerId');
    this.customerId = JSON.parse(value);
    this.productService.deleteAddressById(this.customerId,id).subscribe(response =>{
      console.log(response);
      this.getAllAddress();
    })
  }
  setDefault(id){
    const value = localStorage.getItem('customerId');
    this.customerId = JSON.parse(value);
    this.productService.setDefaultAddress(this.customerId,id).subscribe(response =>{
      console.log(response);
      this.getAllAddress();
      
    })  
  }

}
