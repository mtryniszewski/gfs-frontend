import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFurnitureComponent } from './new-furniture.component';

describe('NewFurnitureComponent', () => {
  let component: NewFurnitureComponent;
  let fixture: ComponentFixture<NewFurnitureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFurnitureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFurnitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
