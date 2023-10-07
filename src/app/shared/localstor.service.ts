import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class LocalStorageService {
  
    setItem(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    
  }