import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DearchiveModalComponent } from './dearchive-modal.component';

describe('DearchiveModalComponent', () => {
  let component: DearchiveModalComponent;
  let fixture: ComponentFixture<DearchiveModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DearchiveModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DearchiveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
