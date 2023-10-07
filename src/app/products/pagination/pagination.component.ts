import { Component, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pagination } from 'src/app/models/pagination.model';
import { PaginationDTO } from 'src/app/models/paginationDto';
import { Product } from 'src/app/models/product.model';
import { ProductService } from '../product.service';
import { ProductsComponent } from '../products.component';
@Injectable()
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit{
  pagination : Pagination = new Pagination();
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();
  paginationDto : PaginationDTO = new PaginationDTO();
  constructor(public productsCom : ProductsComponent
    ,public productService : ProductService){

  }
 
  
  ngOnInit(): void {
   // this.pagination.totalPages= 10;
   this.paginationDto.pageNumber = 0;
   this.paginationDto.pageSize = 8;
   this.paginationDto.sortBy = "productName";
   this.paginationDto.direction = false;;
    this.productService.getPaginationData(this.paginationDto).subscribe(data =>{
      this.pagination = data;
      console.log(this.pagination);
     this.currentPageSubject.next(data.pageable.pageNumber);
      })
  }
  goToPage(name? : string , pageNumber : number = 0) {
    this.paginationDto.pageNumber = pageNumber;
   this.paginationDto.pageSize = 8;
   this.paginationDto.sortBy = "productName";
   this.paginationDto.direction = false;;
    this.productService.getPaginationData(this.paginationDto).subscribe(data =>{
   
      this.pagination = data;
      console.log(this.pagination);
      this.currentPageSubject.next(pageNumber);
      this.productsCom.updateProducts(this.pagination.content);
     
      })
  }
  goToNextOrPreviousPage(direction? : string,name? : string){
    this.goToPage(name,direction === 'forward' ? this.currentPageSubject.value + 1 :this.currentPageSubject.value-1) ;
  }
  makePaginationFilter(pageNumber: number,pageSize : number,name : string,field: string,direction : boolean){
    this.paginationDto.pageNumber = pageNumber;
    this.paginationDto.pageSize = pageSize;
    this.paginationDto.name = name;
    this.paginationDto.sortBy = field;
    this.paginationDto.direction = direction
     this.productService.getPaginationData(this.paginationDto).subscribe(data =>{
   
      this.pagination = data;
      console.log(this.pagination);
      this.currentPageSubject.next(pageNumber);
      this.productsCom.updateProducts(this.pagination.content);
     
      })
  }


}
