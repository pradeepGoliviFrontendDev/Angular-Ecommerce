import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import $ from "jquery";
import { ButtonModule } from 'primeng/button';
import 'magnific-popup';
import { NgxImageZoomComponent } from 'ngx-image-zoom/public-api';
import { Product } from 'src/app/models/product.model';
import { ProductService } from '../product.service';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { Review } from 'src/app/models/review.model';
import { StarNumber } from '../product/product.component';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HeaderComponent } from 'src/app/header/header.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers: [MessageService]
})
export class ProductDetailsComponent implements OnInit, OnDestroy{
  @ViewChild('productImage', { static: true }) productImage: ElementRef;
  @ViewChild('navbar', { static: true }) navbar: HeaderComponent;
  id : number;
  viewImage : string;
  dayOfDelivery : string;
  reviews : Review [] = [];
  totalRating : number;
  totalEachStar : StarNumber = new StarNumber();
  onePer: number;
  twoPer: number;
  threePer : number;
  fourPer : number = 0;
  fivePer : number;
  index : number = 0;
  avgRate = {
    singleStars: 0,
    halfStars:0,
    emptyStar: 0,
  };
  responsiveOptions: any = []


  ngOnInit(): void {
    
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
    this.routerForScroll.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); // Reset scroll position to the top
      }
    });
    this.id = this.router.snapshot.params['id'];
    console.log(this.id);
    this.sharedService.setLoaderState(true);
    this.productService.getProductById(this.id).subscribe(response =>{
      this.product = response;
     this.viewImage =  this.product.imagePath[0]
      console.log(this.product);
      this.dayOfDelivery =this.getFutureDate( this.product.inDeliveryDays);
      console.log("admin",response.admin)
      this.sharedService.setLoaderState(false);
    },error =>{
      this.sharedService.setLoaderState(false);
    })
    this.getAllReviews();
  }
  getAllReviews(){
      this.totalRating = 0;
    let totalReviewCount = 0;
      this.productService.getAllReviews(this.id).subscribe(response =>{
        this.reviews = response;
        this.product.review = response;
        this.reviews.forEach(review =>{
          this.totalRating  += review.rating;
          totalReviewCount++;
          switch(review.rating){
            case 5:
              this.totalEachStar.fiveStar++;
              break;
            case 4:
              this.totalEachStar.fourStar++;
              break;
            case 3:
              this.totalEachStar.threeStar++;
              break;
            case 2:
              this.totalEachStar.twoStar++;
              break;
            case 1:
              this.totalEachStar.oneStar++;
               break;
          }
          console.log(this.totalEachStar,"totalStar");
        })
        if(this.totalRating != 0 && totalReviewCount != 0){
        let rating = this.totalRating/totalReviewCount;
        this.totalRating = rating;
        let singleStars = Math.floor(rating);
        let pointedStar = rating - singleStars;
        let halfStar 
        pointedStar >= 0.5 ? halfStar = 1 : halfStar = 0;
        let emptyStar = 5-singleStars;
        this.avgRate.emptyStar = emptyStar;
        this.avgRate.halfStars = halfStar;
        this.avgRate.singleStars = singleStars;
        }
        this.progessBar();
      })
  }
  progessBar() {
    this.onePer = (this.totalEachStar.oneStar * 100) / this.product.review?.length;
    this.twoPer = (this.totalEachStar.twoStar * 100) / this.product.review?.length;
    this.threePer = (this.totalEachStar.threeStar * 100) / this.product.review?.length;
    this.fourPer = (this.totalEachStar.fourStar * 100) / this.product.review?.length;
    this.onePer = (this.totalEachStar.fiveStar * 100) / this.product.review?.length;
  }
  getFutureDate(daysToAdd: number): string {
    const future = new Date();
    future.setDate(future.getDate() + daysToAdd);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return future.toLocaleDateString('en-US', options);
  }
  ngAfterViewInit() {

    
    
  }
  constructor(private messageService: MessageService, private routerForScroll: Router,private sharedService : SharedService, private datePipe: DatePipe,private productService : ProductService,private router : ActivatedRoute) {


    // Set tomorrow's date by adding one day to the current date
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    this.tomorrow.setHours(0, 0, 0, 0);

    // Calculate the difference between now and tomorrow in milliseconds
    const diff = this.tomorrow.getTime() - this.now.getTime();

    // Convert the difference to hours and minutes
    this.hours = Math.floor(diff / (1000 * 60 * 60));
    this.minutes = Math.floor((diff / (1000 * 60)) % 60);


  }
  ngOnDestroy(): void {
  }

  location = "Deliver to Gunjan - Gwalior 474011‌";
  product  = new Product();
    clickImg(event){
      //this.viewImage = event;
      console.log(event);
      this.viewImage = event;
    } 
    getRoundedUpSingleStars(): number {
      return Math.ceil(this.avgRate.singleStars);
    }
    today: Date = new Date();
    now: Date = new Date();
    tomorrow: Date = new Date();
    hours: number;
    minutes: number;  
    company : string = "Appario Retail Private Ltd";

    @ViewChild('container', { static: true }) container: ElementRef;
 

  formattedDate(): string {
    return this.datePipe.transform(this.today, 'd MMMM');
  }
  onNextClick() {
  //  const containerWidth = this.container.nativeElement.offsetWidth;
   // if (containerWidth > 0) {
    //  setTimeout(() => {
        this.container.nativeElement.scrollLeft += 90;
        if(this.container.nativeElement.scrollLeft >= 90){
          this.prevbutton = true;
        }
        if(this.container.nativeElement.scrollLeft >= 200){
          this.nextbutton = false;
        }
     // },0);
     /// console.log( this.container.nativeElement.scrollLeft);
     console.log(this.container.nativeElement.scrollLeft,this.nextbutton);
    
  }
  onPrevClick() {
    this.container.nativeElement.scrollLeft -= 90;
    if(this.container.nativeElement.scrollLeft === 0){
      this.prevbutton = false;
      this.nextbutton = true;
    }else{
      this.prevbutton = true; 
      this.nextbutton = true;
    }

  }
 prevbutton  = false;
 nextbutton  = true;
 showMore = false;
 customerId : number;
 addToCart(productId: number){
  this.id = this.router.snapshot.params['id'];
  const value = localStorage.getItem('customerId');
  this.customerId = JSON.parse(value);
  this.productService.addtocart(this.customerId,productId).subscribe(data =>{
     console.log(data);
     this.navbar.ngOnInit();
    // alert(data);
    if(data == "Product is already added to the cart")
      this.messageService.add({ severity: 'warn', summary: 'Cart', detail: data });
    else 
    this.messageService.add({ severity: 'success', summary: 'Cart', detail: data });

  },error =>{
    this.messageService.add({ severity: 'error', summary: 'Cart', detail: error.error?.message  })
   console.log(error,"error");
  
  });
 }
 addHelpFull(reviewId){
  const value = localStorage.getItem('customerId');
  this.customerId = JSON.parse(value);
  this.productService.addHelpfullCount(reviewId,this.customerId).subscribe(response =>{
    console.log(response,"helpfullcount");
    this.getAllReviews();
  })
 }

}
