import { TestBed, inject } from '@angular/core/testing';

import { FormDataService } from './form-data.service';

describe('FormDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormDataService]
    });
  });

  it('should be created', inject([FormDataService], (service: FormDataService) => {
    expect(service).toBeTruthy();
  }));
});
