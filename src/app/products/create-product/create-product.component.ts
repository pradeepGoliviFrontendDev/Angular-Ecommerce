import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit{
   products : Product = new Product();
  
   constructor(private productService : ProductService,private router: Router){

   }
   
    ngOnInit(){

    }
    saveProduct(){
    this.productService.createProduct(this.products).subscribe( data =>{
      console.log(data)
      this.goToProducts();
    },error =>console.log(error));
    }

    goToProducts(){
      this.router.navigate(['/products'])
    }
  onSubmit(){
   this.saveProduct()
  }


}