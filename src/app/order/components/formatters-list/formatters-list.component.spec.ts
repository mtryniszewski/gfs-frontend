import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormattersListComponent } from './formatters-list.component';

describe('FormattersListComponent', () => {
  let component: FormattersListComponent;
  let fixture: ComponentFixture<FormattersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormattersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormattersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
