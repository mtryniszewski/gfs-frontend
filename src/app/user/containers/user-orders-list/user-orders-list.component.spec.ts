import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrdersListComponent } from './user-orders-list.component';

describe('UserOrdersListComponent', () => {
  let component: UserOrdersListComponent;
  let fixture: ComponentFixture<UserOrdersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOrdersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOrdersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
