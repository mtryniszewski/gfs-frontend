import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseFabricComponent } from './choose-fabric.component';

describe('ChooseFabricComponent', () => {
  let component: ChooseFabricComponent;
  let fixture: ComponentFixture<ChooseFabricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseFabricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseFabricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
