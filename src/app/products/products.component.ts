import { Component, Injectable, Injector, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Content } from '../models/content.model';
import { GetProduct } from '../models/getProduct.model';
import { Pagination } from '../models/pagination.model';
import { PaginationDTO } from '../models/paginationDto';

import { ProductService } from './product.service';
import { ThemeService } from '../theme/theme-service';
import { LocalStorageService } from '../shared/localstor.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { SharedService } from '../shared.service';
Injectable()
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css','../theme/normal-theme.css'],
  
})
export class ProductsComponent implements OnInit, OnDestroy {
  field : string;
   products : Content []
  //  = [
  //   {
  //   productId : 1,
  //   imagePath : ["https://m.media-amazon.com/images/I/81itQPVn-GL._AC_UY327_FMwebp_QL65_.jpg"]
  //   ,
  //   productName : "boAt Rockerz 450",
  //   price : 4999,
  //   dimension : "aman",
  //   specification : "aman",
  //   manufacturer : "aman",
  //   quantity : 33,
  //   category : undefined
  // }
  // ];
  name : string = '';
  pageNumber : number = 0;
  direction: boolean =false;
  pagination : Pagination = new Pagination();
  pageSize : number=10;
  min : number;
  max : number;
  private currentPageSubject = new BehaviorSubject<number>(0);
  
  currentPage$ = this.currentPageSubject.asObservable();
  paginationDto : PaginationDTO = new PaginationDTO();
  normalTheme = false;
  blurFlag : boolean = false;

 constructor(public sharedService : SharedService, public productService : ProductService,public  themeService : ThemeService, localStroage : LocalStorageService
  , private route:ActivatedRoute){

 }
  ngOnDestroy(): void {
  }
 onPageChange(event){
  console.log(event,"event");
  this.pageSize = event.rows;
  this.pageNumber = event.page;
  this.filter();
 }

 
 ngOnInit(): void {
  this.dataReset();
  this.name = this.route.snapshot.params['id'];
  if(!this.name)
    this.name = '';
    this.sharedService.setLoaderState(true);
   this.paginationDto.name = this.name;
   this.productService.getPaginationData(this.paginationDto).subscribe(data =>{
     this.pagination = data;
     this.products = data.content;
     console.log(this.pagination);
     console.log(data,"data");
     this.sharedService.setLoaderState(false);
    // this.currentPageSubject.next(data.pageable.pageNumber);
     },error =>{
      this.sharedService.setLoaderState(false);
     })
  
  let theme = localStorage.getItem('Theme');
  if(theme=== 'true'){
    this.normalTheme = true;
  }else {
    this.normalTheme = false;
  }
  // this.onAction()
}
dataReset(){
  this.pagination.totalPages= 10;
  this.field = "productName"
  this.paginationDto.pageNumber = 0;
  this.paginationDto.pageSize = 10;
  this.paginationDto.sortBy = this.field;
  this.paginationDto.direction = false;
  this.name = '';
}
 goToPage(name? : string , pageNumber : number = 0) {
   this.paginationDto.pageNumber = pageNumber;
   if(this.pageSize <1)
   this.pageSize = 10;
      this.paginationDto.name = this.name;
    this.paginationDto.pageSize = this.pageSize;
  this.paginationDto.sortBy = this.field;
  this.paginationDto.direction = this.direction;;
   this.productService.getPaginationData(this.paginationDto).subscribe(data =>{
  
     this.pagination = data;
     console.log(this.pagination);
     this.products = data.content;
     this.currentPageSubject.next(pageNumber);
    
    
     })
 }
 goToNextOrPreviousPage(direction? : string,name? : string){
   this.goToPage(name,direction === 'forward' ? this.currentPageSubject.value + 1 :this.currentPageSubject.value-1) ;
 }


 filter(){
  this.paginationDto.pageNumber = this.pageNumber;
  this.paginationDto.pageSize = this.pageSize;
  this.paginationDto.name = this.name;
  this.paginationDto.sortBy = this.field;
  this.paginationDto.direction = this.direction;
  this.paginationDto.minAmount = this.min;
  this.paginationDto.maxAmount = this.max
  this.sharedService.setLoaderState(true);
 this.productService.getPaginationData(this.paginationDto).subscribe(data =>{
      this.pagination = data;
      this.products = data.content;  
      console.log(this.pagination);
      this.sharedService.setLoaderState(false);
      },error => {
        this.sharedService.setLoaderState(false);
      })
  }
  

sortByField(){

  this.paginationDto.pageNumber = this.pageNumber;
  this.paginationDto.pageSize = this.pageSize;
  this.paginationDto.name = this.name;
  this.paginationDto.sortBy = this.field;
  this.paginationDto.direction = this.direction;

 this.productService.getPaginationData(this.paginationDto).subscribe(data =>{
      this.pagination = data;
      this.products = this.pagination.content;
      console.log(this.pagination);
     
      })
  
}
 sortBy(field :string){
    this.field = field;
    this.sortByField();
 }
  order(flag : boolean){
    this.direction = flag;
    this.sortByField();
  }
size(size : number){
  this.pageSize = size;
  this.sortByField();
}
sortByprice(direction){
  this.field = 'discountedPrice';
  this.direction = direction;
  this.sortByField();
}
onPriceInput(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement.value.length > 0) {
    inputElement.placeholder = '';
  } else {
    inputElement.placeholder = '₹ Min';
  }
}

onAction(event?){
  if(event){
    this.dataReset();
    this.name = event;
    this.filter()
  } else {
    setTimeout(() => {
      this.dataReset();
      this.name = this.route.snapshot.params['id'];
      this.filter()
    }, 0);

  }
  if(!event || event == "")
    this.blurFlag = false;

}
blur(event){
  if(!event || event == "")
     this.blurFlag = false;
  else 
    this.blurFlag = true;
}

}