import { TestBed } from '@angular/core/testing';

import { CookieConsertService } from './cookie-consert.service';

describe('CookieConsertService', () => {
  let service: CookieConsertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookieConsertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
