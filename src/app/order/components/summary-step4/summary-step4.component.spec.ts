import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryStep4Component } from './summary-step4.component';

describe('SummaryStep4Component', () => {
  let component: SummaryStep4Component;
  let fixture: ComponentFixture<SummaryStep4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryStep4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryStep4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
