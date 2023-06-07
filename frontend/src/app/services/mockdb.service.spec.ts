import { TestBed } from '@angular/core/testing';

import { MockdbService } from './mockdb.service';

describe('MockdbService', () => {
  let service: MockdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
