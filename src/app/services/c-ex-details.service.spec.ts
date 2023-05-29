import { TestBed } from '@angular/core/testing';

import { CExDetailsService } from './c-ex-details.service';

describe('CExDetailsService', () => {
  let service: CExDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CExDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
