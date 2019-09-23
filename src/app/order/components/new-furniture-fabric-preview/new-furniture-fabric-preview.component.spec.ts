import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFurnitureFabricPreviewComponent } from './new-furniture-fabric-preview.component';

describe('NewFurnitureFabricPreviewComponent', () => {
  let component: NewFurnitureFabricPreviewComponent;
  let fixture: ComponentFixture<NewFurnitureFabricPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFurnitureFabricPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFurnitureFabricPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
