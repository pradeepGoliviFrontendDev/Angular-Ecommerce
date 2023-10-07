import { Component,OnInit } from '@angular/core';
import { ThemeService } from '../theme/theme-service';
import { ProductService } from '../products/product.service';
import { Product } from '../models/product.model';
import { PaginationDTO } from '../models/paginationDto';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css','../theme/normal-theme.css']
})
export class HomePageComponent implements OnInit{
  normalTheme = false;
  constructor(private themeService:ThemeService,private productService : ProductService, private sharedService : SharedService){}
  products :Product[] = [];
  paginationDto : PaginationDTO = new PaginationDTO();
  responsiveOptions : any [] = []


  ngOnInit(): void {
    let theme = localStorage.getItem('Theme');
    if(theme=== 'true'){
      this.normalTheme = true;
    }else {
      this.normalTheme = false;
    }
    this.dataReset();
    this.productService.getPaginationData(this.paginationDto).subscribe(data =>{
      this.products = data.content;
      console.log(data,"data");
      this.sharedService.setLoaderState(false);
     // this.currentPageSubject.next(data.pageable.pageNumber);
      },error =>{
       this.sharedService.setLoaderState(false);
      })

      this.responsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];
  }
  dataReset(){
    this.paginationDto.pageNumber = 0;
    this.paginationDto.pageSize = 10;
    this.paginationDto.sortBy = "productName";
    this.paginationDto.direction = true;
    this.paginationDto.name = '';
  }
  getAndSetTheme(){
   let theme =  localStorage.getItem("Theme");
   if(theme=== 'true'){
    this.normalTheme = true;
  }else {
    this.normalTheme = false;
  }
    // this.themeService.setActiveTheme(this.normalTheme);
    return this.normalTheme;
  }
  setTheme(event){
    localStorage.setItem('Theme',event+"");
    this.normalTheme = event;
    this.themeService.setActiveTheme(this.normalTheme);
  }
}
