import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseDimensionsStep3Component } from './choose-dimensions-step3.component';

describe('ChooseDimensionsStep3Component', () => {
  let component: ChooseDimensionsStep3Component;
  let fixture: ComponentFixture<ChooseDimensionsStep3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseDimensionsStep3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseDimensionsStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
