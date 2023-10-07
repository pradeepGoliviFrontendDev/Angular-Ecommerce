import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CssSelector } from "@angular/compiler";
import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Address } from "../models/address.model";
import { CartProduct } from "../models/cartProduct.model";
import { Content } from "../models/content.model";
import { Customer } from "../models/customer.model";
import { GetProduct } from "../models/getProduct.model";
import { LoginForm } from "../models/LoginForm";
import { Orders } from "../models/order.model";
import { Pagination } from "../models/pagination.model";
import { PaginationDTO } from "../models/paginationDto";

import { Product } from "../models/product.model";
import { JwtResponse } from "../models/jwtReponse.model";
import { AuthAddress } from "../models/AuthAddress.model";
import { Review } from "../models/review.model";

@Injectable() 
export class ProductService {
   productSelected = new EventEmitter<Content>();
   OrderSelected = new EventEmitter<Orders>();
  //  baseUrl = "http://localhost:8888"
  //  baseUrl = "http://ec2-54-167-193-160.compute-1.amazonaws.com:8888";
  // baseUrl = "https://bindgo-deployed-railway-production.up.railway.app";
  baseUrl = "http://bindgo-env-2.eba-rjcj5zjq.us-east-1.elasticbeanstalk.com"

 

constructor(private http: HttpClient) { 
 
}
createCustomer(customer : Customer): Observable<Customer>{
  return this.http.post<Customer>(`${this.baseUrl}/customer/create`, customer);
}
getProductList(): Observable<Content[]>{
  return this.http.get<Content[]>(`${this.baseUrl}/customer/getAllProduct`);
}
getCustomerList(): Observable<Customer[]> {
  return this.http.get<Customer[]>(`${this.baseUrl}/admin/viewAll`);
}
getCustomerById(id : number) : Observable<Customer> {
  return this.http.get<Customer>(`${this.baseUrl}/admin/viewById/${id}`)
}
updateCustomer(id: number ,customer : Customer): Observable<Object>{
  return this.http.put(`${this.baseUrl}/customer/update/${id}`,customer,{responseType : `text`});

}
deleteCustomer(id: number) : Observable<Object> {
  return this.http.delete(`${this.baseUrl}/customer/delete/${id}`,{responseType : `text`});
}
createProduct(product: Product): Observable<Object>{
  return this.http.post(`${this.baseUrl}/product/create`,product);
}
getProductById(id : number): Observable<Product>{
  return this.http.get<Product>(`${this.baseUrl}/admin/getProductById/${id}`);
}
updateProduct(id: number,product: Product): Observable<Object>{
  return this.http.put(`${this.baseUrl}/product/updateProduct/${id}`,product,{responseType : `text`});
}
deleteProduct(id: number) : Observable<Object>{
  return this.http.delete(`${this.baseUrl}/admin/removeProduct/${id}`,{responseType : `text`});
}
getSortedProductList(): Observable<Product[]>{
  return this.http.get<Product[]>(`${this.baseUrl}/customer/getSortedProductByAnyFieldAsc/price`);
}
getSortedProductListDesc(): Observable<Product[]>{
  return this.http.get<Product[]>(`${this.baseUrl}/customer/getSortedProductByAnyFieldDsc/price`);
}
getSortedAnyField(field : string): Observable<Product[]>{
  return this.http.get<Product[]>(`${this.baseUrl}/customer/getSortedProductByAnyFieldAsc/${field}`);
}
addtocart(customerId : number,productId : number) : Observable<string>{
  return this.http.get(`${this.baseUrl}/customer/cart/${customerId}/1/${productId}`,{responseType : `text`});
}
getallProductFromCart(customerId : number) : Observable<CartProduct []>{
  return this.http.get<CartProduct []>(`${this.baseUrl}/customer/getAllProductAddedInCart/${customerId}`);
}
updateQuantityCart(productId: number ,quantity : number, customerId : number) : Observable<Object>{
  return this.http.get<Object>(`${this.baseUrl}/customer/updatingQuantity/${productId}/${quantity}/${customerId}`);
}
deleteProductFromCart(productId: number,customerId: number) : Observable<Object>{
  return this.http.delete(`${this.baseUrl}/customer/removeProductFromCart/${productId}/${customerId}`,{responseType: `text`});
}
getAllOrder(customerId : number, paginationDto): Observable<Pagination>{
  return this.http.post<Pagination>(`${this.baseUrl}/customer/getAllOrdersByCustomer/${customerId}`,paginationDto);
}
Order(customerId:number): Observable<Object>{
  return this.http.get(`${this.baseUrl}/order/orderProduct/${customerId}`);
}
getOrderById(orderId : number) : Observable<Orders>{
  return this.http.get<Orders>(`${this.baseUrl}/order/getOrderById/${orderId}`)
  
}
getPaginationData(paginationDto : PaginationDTO) : Observable<Pagination> {
  return this.http.post<Pagination>(`${this.baseUrl}/product/pagination`,paginationDto);
}
login(loginForm: LoginForm){
  // const headers = new HttpHeaders({
  //   `Content-Type`: `application/json`
  // })

  return this.http.post<any>(`${this.baseUrl}/login`,loginForm);
}
// currentUser(): Observable<Customer> {
//   return this.http.get<Customer>(`${this.baseUrl}/current-user`);
// }
currentUser(jwtResponse : JwtResponse): Observable<Customer>{
  return this.http.post<Customer>(`${this.baseUrl}/current-user`,jwtResponse);
}
logout(): Observable<string>{
  return this.http.get<string>(`${this.baseUrl}/logout`);
}
checkCurrentUser(): Observable<Customer>{
  return this.http.get<Customer>(`${this.baseUrl}/current-user`);
}
addAddresss(authAddress : AuthAddress) : Observable<Object>{
  return this.http.post(`${this.baseUrl}/address/add`,authAddress,{responseType: `text`});
}
getAllAddress(customerId) : Observable<Address []>{
  return this.http.get<Address []>(`${this.baseUrl}/address/getAllAddress/${customerId}`);
} 
getAddressById(addressId) : Observable<Address>{
  return this.http.get<Address>(`${this.baseUrl}/address/getById/${addressId}`);
}
deleteAddressById(customerId,addressId) : Observable<Object>{
  return this.http.delete(`${this.baseUrl}/address/deleteById/${customerId}/${addressId}`,{responseType: `text`});
}
setDefaultAddress(customerId, addressId) : Observable<Object>{
  return this.http.get(`${this.baseUrl}/address/setDefault/${customerId}/${addressId}`,{responseType: `text`});
}
addReviewToAdmin(customerId, productId, orderId, review : Review) : Observable<Object>{
  return this.http.post(`${this.baseUrl}/customer/review/${customerId}/${productId}/${orderId}`,review);
}
addReviewToProduct(customerId, productId, orderId, review : Review) : Observable<Object>{
  return this.http.post(`${this.baseUrl}/product/review/${customerId}/${productId}/${orderId}`,review);
}
getReviewOfProduct(customerId, productId, orderId): Observable<Review>{
  return this.http.get<Review>(`${this.baseUrl}/product/review/${customerId}/${productId}/${orderId}`);
}
getReviewOfAdmin(customerId, productId, orderId): Observable<Review>{
  return this.http.get<Review>(`${this.baseUrl}/c
  ustomer/review/${customerId}/${productId}/${orderId}`);
}
getAllReviews(productId): Observable<Review[]>{
  return this.http.get<Review[]>(`${this.baseUrl}/product/getAllReview/${productId}`)
}
addHelpfullCount(reviewId, customerId): Observable<Review>{
  return this.http.get<Review>(`${this.baseUrl}/product/addReviewCount/${reviewId}/${customerId}`);
}
}
