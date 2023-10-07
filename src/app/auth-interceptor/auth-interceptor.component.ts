import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
@Component({
  selector: 'app-auth-interceptor',
  templateUrl: './auth-interceptor.component.html',
  styleUrls: ['./auth-interceptor.component.css']
})
export class AuthInterceptorComponent implements HttpInterceptor{
 
constructor(){}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Inside inter")
    let authreq=request;
    const token= localStorage.getItem('token');
    //console.log("Herer is token->" +token)
    if(token!=null){
        console.log("Herer is token->...." +token)

        authreq=authreq.clone({
            
            headers:request.headers.set('Authorization',`Bearer ${token}`)
            // .set('Content-Type', 'application/json')
            // .set('Access-Control-Allow-Origin', '*')
            // .set('mode','no-cors')
            // .set("Cache-Control", "no-cache")
            // .set("Cache-Control", "no-store")
            // .set('Connection',"keep-alive")
            .set("Accept","*/*")
            
        });
        // authreq=authreq.clone({
        //     withCredentials:true,
        //     headers:req.headers.set('Authorization',`Bearer ${token}`).set('Access-Control-Allow-Origin', '*')

        // 
        return next.handle(authreq);
        //httpOptions.headers = httpOptions.headers.set('Access-Control-Allow-Origin', '*');
    }else{
        return next.handle(request);
    }
    
    

}
  }
