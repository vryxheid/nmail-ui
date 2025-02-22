import { TestBed } from '@angular/core/testing';

import { NMailApiService } from './nmail-api.service';

describe('NMailApiService', () => {
  let service: NMailApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NMailApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
