import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerArchivesComponent } from './producer-archives.component';

describe('ProducerArchivesComponent', () => {
  let component: ProducerArchivesComponent;
  let fixture: ComponentFixture<ProducerArchivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducerArchivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducerArchivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
