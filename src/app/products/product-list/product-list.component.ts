import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Content } from 'src/app/models/content.model';
import { Product } from 'src/app/models/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  products : Content [] = [];
  constructor(private productService : ProductService,private router: Router) {

  }
 ngOnInit(): void {
   this.getProduct()
 }
 private getProduct(){
  this.productService.getProductList().subscribe(data => {
   this.products = data;
    console.log(data);
  })
 }
 deleteProduct(id : number){
  this.productService.deleteProduct(id).subscribe(data =>{
    console.log(data);
    this.getProduct();
  })
 }



}
