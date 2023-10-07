import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer.model';
import { Orders } from '../models/order.model';
import { ProductService } from '../products/product.service';
import { ProductDto } from '../models/productDto.model';
import { Address } from '../models/address.model';
import { CartProduct } from '../models/cartProduct.model';
import { PaginationDTO } from '../models/paginationDto';
import { Pagination } from '../models/pagination.model';
import { error } from 'jquery';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Orders[]
  customerId: number;
  field: string;
  name: string;
  pageNumber: number = 0;
  direction: boolean = false;
  pageSize: number = 10;
  pagination : Pagination = new Pagination();
  paginationDto: PaginationDTO = new PaginationDTO();

  constructor(private sharedService : SharedService,private productService: ProductService) {

  }
  ngOnInit(): void {
    this.filter()
  }
  getAllOrders() {
    const value = localStorage.getItem('customerId');
    this.customerId = JSON.parse(value);
    this.sharedService.setLoaderState(true);
    this.productService.getAllOrder(this.customerId, this.paginationDto).subscribe(data => {
      console.log(data);
      this.orders = data.content;
      this.pagination = data;
      this.sharedService.setLoaderState(false);
    },error => {console.log(error,"orders")
    this.sharedService.setLoaderState(false);
  })
  }
  dataReset(){
    this.pagination.totalPages= 10;
    this.field = "orderDate";
    this.paginationDto.pageNumber = this.pageNumber;
    this.paginationDto.pageSize = this.pageSize
    this.paginationDto.sortBy = this.field;
    this.paginationDto.direction = false;
  }
  filter(){
    this.dataReset()
    this.paginationDto.direction = this.direction;
    this.getAllOrders();
  }
  onPageChange(event){
    console.log(event,"event");
    this.pageSize = event.rows;
    this.pageNumber = event.page;
    this.filter();
   }
  


}
