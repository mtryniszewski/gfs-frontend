import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserArchivesComponent } from './user-archives.component';

describe('UserArchivesComponent', () => {
  let component: UserArchivesComponent;
  let fixture: ComponentFixture<UserArchivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserArchivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserArchivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
