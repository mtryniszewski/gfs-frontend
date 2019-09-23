import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveFabricComponent } from './archive-fabric.component';

describe('ArchiveFabricComponent', () => {
  let component: ArchiveFabricComponent;
  let fixture: ComponentFixture<ArchiveFabricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveFabricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveFabricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
