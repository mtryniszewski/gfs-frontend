import { TestBed, async, inject } from '@angular/core/testing';

import { StandardGuard } from './standard.guard';

describe('StandardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StandardGuard]
    });
  });

  it('should ...', inject([StandardGuard], (guard: StandardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
