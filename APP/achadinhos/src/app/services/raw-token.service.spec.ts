import { TestBed } from '@angular/core/testing';

import { RawTokenService } from './raw-token.service';

describe('RawTokenService', () => {
  let service: RawTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RawTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
