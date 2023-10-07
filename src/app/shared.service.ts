
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();
  constructor(private cdRef: ChangeDetectorRef) {}

  setLoaderState(isLoading: boolean): void {
    this.isLoadingSubject.next(isLoading);
    this.cdRef.detectChanges(); // Manually trigger change detection

  }
}
