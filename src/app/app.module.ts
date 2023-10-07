import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { FormsModule, NgModel } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { ProductService } from './products/product.service';
import { Product } from './models/product.model';
import { ProductComponent } from './products/product/product.component';
import { CartComponent } from './cart/cart.component';
import { CustomerComponent } from './customer/customer.component';
import { RouterModule, Routes } from '@angular/router';
import { FetchCustomerListComponent } from './customer/fetch-customer-list/fetch-customer-list.component';
import { UpdateCustomerComponent } from './customer/update-customer/update-customer.component';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { UpdateProductComponent } from './products/update-product/update-product.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';
import { AddressComponent } from './customer/address/address.component';
import { OrderDetailsComponent } from './orders/order/order-details/order-details.component';

import { DropdownDirective } from './shared/dropdown.directive';
import { LoginComponent } from './login/login.component';

import { AuthInterceptorComponent } from './auth-interceptor/auth-interceptor.component';
import { AuthGuard } from './auth.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { FooterComponent } from './footer/footer.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ThemeService } from './theme/theme-service';
import { ThemeSelectorComponent } from './theme/theme-common.component';
import { CoreModule } from '@angular/flex-layout';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { AddEditAddressComponent } from './customer/address/add-edit-address/add-edit-address.component';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReviewComponent } from './products/review/review.component';
import { RatingModule } from 'primeng/rating';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { AccountComponent } from './account/account.component';
import { PaginatorModule } from 'primeng/paginator';
import { LoaderComponent } from './loader/loader.component';
import { CarouselModule } from 'primeng/carousel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';





const appRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'signin', component: LoginComponent },
  { path: 'signup', component: CustomerComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductsComponent },
  { path: 'customerList', component: FetchCustomerListComponent, canActivate: [AuthGuard] },
  { path: 'updateCustomer/:id', component: UpdateCustomerComponent, canActivate: [AuthGuard] },
  { path: 'customer-details/:id', component: CustomerDetailsComponent, canActivate: [AuthGuard] },
  { path: 'createProduct', component: CreateProductComponent, canActivate: [AuthGuard] },
  { path: 'productList', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'updateProduct/:id', component: UpdateProductComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'address', component: AddressComponent, canActivate: [AuthGuard] },
  { path: 'orders/:id', component: OrderDetailsComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'address/add', component: AddEditAddressComponent },
  { path: 'address/edit/:id', component: AddEditAddressComponent },
  { path: 'review', component: ReviewComponent}, 
  { path: 'account', component: AccountComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    ProductComponent,
    CartComponent,
    CustomerComponent,
    FetchCustomerListComponent,
    UpdateCustomerComponent,
    CustomerDetailsComponent,
    CreateProductComponent,
    ProductListComponent, UpdateProductComponent,
    OrderComponent, OrdersComponent, AddressComponent, OrderDetailsComponent,
    DropdownDirective, LoginComponent, AuthInterceptorComponent, HomePageComponent, FooterComponent, ProductDetailsComponent, ThemeSelectorComponent, AddEditAddressComponent, ReviewComponent, AccountComponent, LoaderComponent],
  imports: [BrowserModule, FormsModule, TooltipModule, CommonModule, NgxImageZoomModule,CarouselModule,
    HttpClientModule,FormsModule,RatingModule,OverlayPanelModule,ProgressBarModule,ToastModule,MessagesModule,PaginatorModule,
    RouterModule.forRoot(appRoutes), CoreModule, ButtonModule, DialogModule,BrowserAnimationsModule,ConfirmDialogModule
  ],
  providers: [AuthGuard, DatePipe, ThemeService, ThemeSelectorComponent, ProductService, OrderDetailsComponent, ProductsComponent, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorComponent, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
