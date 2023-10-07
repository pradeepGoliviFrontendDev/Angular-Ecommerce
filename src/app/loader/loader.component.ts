import { Component, Input,OnInit,OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { SharedService } from '../shared.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit,OnDestroy {

  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
    
  }

}
