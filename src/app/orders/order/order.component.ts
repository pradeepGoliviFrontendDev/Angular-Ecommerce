import { Component, Injectable, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Orders } from 'src/app/models/order.model';
import { ProductService } from 'src/app/products/product.service';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { CartProduct } from 'src/app/models/cartProduct.model';
import { DatePipe } from '@angular/common';
Injectable()
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Input() order : Orders;
  id : number;

  products : CartProduct [] = [

    {
  id : 12,
  
      productId : 1,
      imagePath: 
        "https://m.media-amazon.com/images/I/61bK6PMOC3L._SX679_.jpg",
      productName: "Apple iPhone 14 (128 GB) - Blue",
      price : 89900,
      quantity: 50,
  dimension : 23,
  manufacturer: "NOkia",
  discountPercentage: 5

  }
  ]
  ngOnInit(){

  }
  constructor(private productService: ProductService,private router : Router,private orderDetails : OrderDetailsComponent, private datePipe: DatePipe ){}
  onSelected(){

    this.productService.OrderSelected.emit(this.order);
  
  }
 giveOrderId(orderId : number){
  this.router.navigate([`orders/${orderId}`]);
 }

}
