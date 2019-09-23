import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricPreviewComponent } from './fabric-preview.component';

describe('FabricPreviewComponent', () => {
  let component: FabricPreviewComponent;
  let fixture: ComponentFixture<FabricPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabricPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
