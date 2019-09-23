import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAdminDetailsComponent } from './order-admin-details.component';

describe('OrderAdminDetailsComponent', () => {
  let component: OrderAdminDetailsComponent;
  let fixture: ComponentFixture<OrderAdminDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAdminDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAdminDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
