import { TestBed } from '@angular/core/testing';

import { CRatesApiService } from './c-rates-api.service';

describe('CRatesApiService', () => {
  let service: CRatesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CRatesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
