import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricsListComponent } from './fabrics-list.component';

describe('FabricsListComponent', () => {
  let component: FabricsListComponent;
  let fixture: ComponentFixture<FabricsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabricsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
