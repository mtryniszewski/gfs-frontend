import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderArchiveComponent } from './order-archive.component';

describe('OrderArchiveComponent', () => {
  let component: OrderArchiveComponent;
  let fixture: ComponentFixture<OrderArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
