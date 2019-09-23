import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFabricComponent } from './edit-fabric.component';

describe('EditFabricComponent', () => {
  let component: EditFabricComponent;
  let fixture: ComponentFixture<EditFabricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFabricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFabricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
