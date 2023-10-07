import { HttpClient } from '@angular/common/http';
import { Component, ViewChild,OnInit,OnDestroy } from '@angular/core';
import { Customer } from './models/customer.model';
import { ProductService } from './products/product.service';
import { LoaderComponent } from './loader/loader.component';
import { Subscription } from 'rxjs';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductService,SharedService]
})
export class AppComponent implements OnInit,OnDestroy {
  title = 'E-Commerce';
  loadedPosts = [];
  customers : Customer [] = [];
  isLoading: boolean = false;

  constructor(public sharedService : SharedService, private http: HttpClient,private productService : ProductService) {}

  private isLoadingSubscription: Subscription;

  ngOnInit(): void {
    // Subscribe to the isLoading$ observable when the component is initialized
    this.isLoadingSubscription = this.sharedService.isLoading$.subscribe((isLoading) => {
      console.log('Loader state changed:', isLoading);
      this.isLoading = isLoading;
      // Add logic to handle the loader state change in this component
    });
  }

  onCreatePost(postData: { name: string; email: string ; mobileNumber : String; password : String}) {
   
    this.http.post('http://localhost:8888/Customer/create',postData).subscribe(response => {
      console.log(response);
    console.log(postData);
  });
  }
  ngOnDestroy(): void {
    // Unsubscribe from the isLoading$ observable when the component is destroyed
    if(this.isLoadingSubscription)
    this.isLoadingSubscription.unsubscribe();
  }



  
}
