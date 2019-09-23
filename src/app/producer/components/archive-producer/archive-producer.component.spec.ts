import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveProducerComponent } from './archive-producer.component';

describe('ArchiveProducerComponent', () => {
  let component: ArchiveProducerComponent;
  let fixture: ComponentFixture<ArchiveProducerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveProducerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveProducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
