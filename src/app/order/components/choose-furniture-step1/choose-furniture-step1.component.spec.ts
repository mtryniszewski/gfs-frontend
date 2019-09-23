import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseFurnitureStep1Component } from './choose-furniture-step1.component';

describe('ChooseFurnitureStep1Component', () => {
  let component: ChooseFurnitureStep1Component;
  let fixture: ComponentFixture<ChooseFurnitureStep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseFurnitureStep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseFurnitureStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
