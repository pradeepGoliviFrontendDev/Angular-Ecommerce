import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {

  id: number;
  product : Product = new Product();
  constructor(private productService : ProductService,
    private route:ActivatedRoute , private router : Router){

  }
  
   ngOnInit(): void {
     this.id = this.route.snapshot.params['id'];
    this.productService.getProductById(this.id).subscribe(data =>{
      this.product = data;
      console.log(data);
    },error => console.log(error));
    
   }
 


 onSubmit(){
  
 this.productService.updateProduct(this.id,this.product).subscribe(data => {

console.log(data);
this.goToProductList();
 },error => console.log(error));
 }
 goToProductList(){
  this.router.navigate(['/productList']);
 }


}
