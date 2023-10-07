import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthAddress } from 'src/app/models/AuthAddress.model';
import { Address } from 'src/app/models/address.model';
import { ProductService } from 'src/app/products/product.service';
import { Location } from '@angular/common'
import { SharedService } from 'src/app/shared.service';
import { error } from 'jquery';

@Component({
  selector: 'app-add-edit-address',
  templateUrl: './add-edit-address.component.html',
  styleUrls: ['./add-edit-address.component.css']
})
export class AddEditAddressComponent implements OnInit{
  customerId : number;
  id: number;
  address : Address = new Address();
  
  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.sharedService.setLoaderState(true);
    this.productService.getAddressById(this.id).subscribe(response =>{
      this.address = response;
      this.sharedService.setLoaderState(false);
    },error =>{
      this.sharedService.setLoaderState(false);
    })
  }
  constructor(private sharedService : SharedService,private productService : ProductService,private router: ActivatedRoute, private location: Location,private routeer: Router){

  }
  addAddress(){
  const value = localStorage.getItem('customerId');
  this.customerId = JSON.parse(value);
  let token = localStorage.getItem('token');
  let auth = new AuthAddress(); 
  auth.token = token;
  auth.address = this.address;
  this.productService.addAddresss(auth).subscribe(data=>{
  });
  this.location.back();
}



}
