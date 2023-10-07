import { Component, Injectable, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Content } from 'src/app/models/content.model';
import { Product } from 'src/app/models/product.model';
import { LocalStorageService } from 'src/app/shared/localstor.service';
import { ProductService } from '../product.service';
import { Review } from 'src/app/models/review.model';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
Injectable()
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {
  @Input() product: Content;
  id: number;
  customerId: number;
  review : Review [] = []
  totalRating : number;
  totalEachStar : StarNumber = new StarNumber();
  onePer: number;
  twoPer: number;
  threePer : number;
  fourPer : number = 0;
  fivePer : number;
  avgRate = {
    singleStars: 0,
    halfStars:0,
    emptyStar: 0,
  };
  constructor(private localStor: LocalStorageService, public productService: ProductService, private router: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.totalRating = 0;
    let totalReviewCount = 0;
      this.productService.getAllReviews(this.product.productId).subscribe(response =>{
        this.review = response;
        this.product.review = response;
        this.review.forEach(review =>{
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
        console.log(this.review);
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
      })

  }
  getRoundedUpSingleStars(): number {
    return Math.ceil(this.avgRate.singleStars);
  }
  onSelected() {

    this.productService.productSelected.emit(this.product);

  }

  progessBar() {
    this.onePer = 0;
    this.twoPer = 0;
    this.threePer = 0;
    this.fourPer = 0;
    this.fivePer = 0;
        let one = (this.totalEachStar.oneStar * 100) / this.product.review?.length;
        let two = (this.totalEachStar.twoStar * 100) / this.product.review?.length;
        let three = (this.totalEachStar.threeStar * 100) / this.product.review?.length;
        let four = (this.totalEachStar.fourStar * 100) / this.product.review?.length;
        let five = (this.totalEachStar.fiveStar * 100) / this.product.review?.length;
      
        for(let i = 0;i<one ;i++){
          setTimeout(() => {
            this.onePer++;
          }, 0);
        }
        for(let i = 0;i<two ;i++){
          setTimeout(() => {
            this.twoPer++;
          }, 0);
        }
        for(let i = 0;i<three ;i++){
          setTimeout(() => {
            this.threePer++;
          }, 0);
        }
        for(let i = 0;i<four;i++){
          setTimeout(() => {
            this.fourPer++;
          }, 0);
        }
        for(let i = 0;i<five ;i++){
          setTimeout(() => {
            this.fivePer++;
          }, 0);
        }
        
    }
}
export class StarNumber {
  fiveStar : number = 0;
  fourStar : number = 0;
  threeStar : number = 0;
  twoStar : number = 0;
  oneStar : number = 0;
}