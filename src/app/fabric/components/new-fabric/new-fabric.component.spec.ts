import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFabricComponent } from './new-fabric.component';

describe('NewFabricComponent', () => {
  let component: NewFabricComponent;
  let fixture: ComponentFixture<NewFabricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFabricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFabricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
