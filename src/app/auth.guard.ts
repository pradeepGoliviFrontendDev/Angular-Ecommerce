import { isPlatformWorkerApp } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from './products/product.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isloggedIn : boolean = false;
  constructor(private router : Router,private productService : ProductService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
   if(localStorage.getItem('token')!= undefined && localStorage.getItem('token').length >0){

        return true;

      }else{
        this.router.navigate(['/']);
        return false;
      }
  }
  currentUser(){
    
  }
}
