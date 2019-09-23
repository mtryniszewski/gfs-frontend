import { TestBed, inject } from '@angular/core/testing';

import { PageSizeService } from './page-size.service';

describe('PageSizeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageSizeService]
    });
  });

  it('should be created', inject([PageSizeService], (service: PageSizeService) => {
    expect(service).toBeTruthy();
  }));
});
