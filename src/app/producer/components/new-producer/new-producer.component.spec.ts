import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProducerComponent } from './new-producer.component';

describe('NewProducerComponent', () => {
  let component: NewProducerComponent;
  let fixture: ComponentFixture<NewProducerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProducerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
