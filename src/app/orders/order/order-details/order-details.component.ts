import { DatePipe } from '@angular/common';
import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Orders } from 'src/app/models/order.model';
import { ProductService } from 'src/app/products/product.service';
import { SharedService } from 'src/app/shared.service';
@Injectable()
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
   order = new Orders();
   id : number;
 ngOnInit(){
 this.orderDetails();
 }
 constructor(private sharedService : SharedService, private productService : ProductService,private router : ActivatedRoute, private datePipe: DatePipe){}
 orderDetails(){
  this.id = this.router.snapshot.params['id'];
  console.log(this.id);
  this.sharedService.setLoaderState(true);
  this.productService.getOrderById(this.id).subscribe(response =>{
    this.order = response;
    this.sharedService.setLoaderState(false);

  },error =>{
    this.sharedService.setLoaderState(false);

  })

  }

}
