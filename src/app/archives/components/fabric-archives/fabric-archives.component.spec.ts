import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricArchivesComponent } from './fabric-archives.component';

describe('FabricArchivesComponent', () => {
  let component: FabricArchivesComponent;
  let fixture: ComponentFixture<FabricArchivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabricArchivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricArchivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
