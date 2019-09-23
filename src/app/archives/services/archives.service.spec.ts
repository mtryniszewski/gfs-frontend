import { TestBed, inject } from '@angular/core/testing';

import { ArchivesService } from './archives.service';

describe('ArchivesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArchivesService]
    });
  });

  it('should be created', inject([ArchivesService], (service: ArchivesService) => {
    expect(service).toBeTruthy();
  }));
});
