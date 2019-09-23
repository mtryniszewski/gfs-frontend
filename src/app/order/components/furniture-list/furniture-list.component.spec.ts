import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FurnitureListComponent } from './furniture-list.component';

describe('FurnitureListComponent', () => {
  let component: FurnitureListComponent;
  let fixture: ComponentFixture<FurnitureListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FurnitureListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FurnitureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
