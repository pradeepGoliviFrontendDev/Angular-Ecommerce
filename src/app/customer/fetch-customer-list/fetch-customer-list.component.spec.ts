import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchCustomerListComponent } from './fetch-customer-list.component';

describe('FetchCustomerListComponent', () => {
  let component: FetchCustomerListComponent;
  let fixture: ComponentFixture<FetchCustomerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FetchCustomerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FetchCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
