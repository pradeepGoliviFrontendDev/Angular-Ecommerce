import { Component, Injectable, Input,Output,EventEmitter, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FetchCustomerListComponent } from '../customer/fetch-customer-list/fetch-customer-list.component';
import { ProductService } from '../products/product.service';
import { ProductComponent } from '../products/product/product.component';
import { ProductsComponent } from '../products/products.component';
import { Router } from '@angular/router';
import { ThemeService } from '../theme/theme-service';
import { Pagination } from '../models/pagination.model';
import { Content } from '../models/content.model';
import { PaginationDTO } from '../models/paginationDto';
import { JwtResponse } from '../models/jwtReponse.model';
import { Customer } from '../models/customer.model';
@Injectable()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ProductsComponent,FetchCustomerListComponent]
})
export class HeaderComponent  implements OnInit, AfterViewInit {

  @Input() normalTheme = false; 
  @Input() cartProducts : number =0;
  field : string;
  products : Content []
  name : string;
  pageNumber : number = 0;
  direction: boolean =false;
  pagination : Pagination = new Pagination();
  pageSize : number=8;
  min : number;
  max : number;
  paginationDto : PaginationDTO = new PaginationDTO();
  user : Customer = new Customer();
  @Output() onAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() onBlur: EventEmitter<any> = new EventEmitter<any>();

  searchName : string;
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef<HTMLInputElement>;
  @ViewChild('contentDiv', { static: true }) contentDiv!: ElementRef<HTMLDivElement>;
  @ViewChild('msearchInput', { static: true }) msearchInput!: ElementRef<HTMLInputElement>;
  @ViewChild('mcontentDiv', { static: true }) mcontentDiv!: ElementRef<HTMLDivElement>;
  customerId : number;
  searchFlag : boolean = false;

  ngOnInit(): void {
    this.field = "productName"
    const value = localStorage.getItem('customerId');
    this.customerId = JSON.parse(value);
    this.getAllProductFromCart(this.customerId);
    this.currentUser();
  }
  collapsed = true;
  constructor(private productsComponent: ProductsComponent,private fetchCust : FetchCustomerListComponent,private productService : ProductService,
    private router : Router,private themeService:ThemeService){

  }
  ngAfterViewInit() {
    // Get the computed width of the input element
    const inputWidth = getComputedStyle(this.searchInput.nativeElement).width;

    // Apply the width to the content element
    this.contentDiv.nativeElement.style.width = inputWidth;
    // const minputWidth = getComputedStyle(this.msearchInput.nativeElement).width;
    const msearchInput = this.msearchInput.nativeElement.offsetWidth;

    // Apply the width to the content element
    this.mcontentDiv.nativeElement.style.width = '73.5%';
  }
  currentUser(){
    let jwt : JwtResponse = new JwtResponse();
    jwt.token = localStorage.getItem("token");
     this.productService.currentUser(jwt).subscribe(response=>{
        this.user = response;
        console.log("user",this.user)
     },error => {
       console.log(error);
     })
    }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateContentWidth();
  }
  updateContentWidth(){
    const inputWidth = getComputedStyle(this.searchInput.nativeElement).width;
    // Apply the width to the content element
    this.contentDiv.nativeElement.style.width = inputWidth;
  }

  getItem(){
    const value = localStorage.getItem('customerId');
    this.customerId = JSON.parse(value);
    // this.cart.getAllProductFromCart(this.customerId);
  }
 logout(){
  localStorage.removeItem("token");      
  localStorage.removeItem('customerId');

  this.user = new Customer();
 }
 loginAuth(){
 
 }
 getAllProductFromCart(id: number){
  this.productService.getallProductFromCart(id).subscribe(data =>{
    this.cartProducts = data.length;
},error => {
  console.log(error)
  this.cartProducts = 0;
} );
 }
 
 filter(){
  const msearchInput = this.msearchInput.nativeElement.offsetWidth;
  this.mcontentDiv.nativeElement.style.width = msearchInput.toString()+'px'

  this.paginationDto.pageNumber = this.pageNumber;
  this.paginationDto.pageSize = this.pageSize;
  if(!this.searchName){
    this.searchName = '';
    this.searchFlag = false;
  }
  this.paginationDto.name = this.searchName;
  this.paginationDto.sortBy = this.field;
  this.paginationDto.direction = this.direction;
  this.paginationDto.minAmount = this.min;
  this.paginationDto.maxAmount = this.max
  this.paginationDto.search = true;
 this.productService.getPaginationData(this.paginationDto).subscribe(data =>{
      this.pagination = data;
      this.products = this.pagination.content;
      console.log(this.pagination,"header");
      })
  }
search(){
  console.log(this.searchName,"searchname")
  this.onAction.emit(this.searchName);
  this.searchName = null;
  this.searchFlag = false;
  this.onBlur.emit('');
}
blur(){
  if(!this.searchName || this.searchName == ''){
    this.searchFlag = false;
  }
  this.onBlur.emit(this.searchName);
  this.searchFlag = true;
}
resetData(){
 this.products = []
}
searchByName(name?){
  if(name){
    this.searchName = name;
    this.searchFlag = false;
  }
  else this.searchFlag = false;
}
}
