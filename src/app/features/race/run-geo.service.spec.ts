import { TestBed } from '@angular/core/testing';

import { RunGeoService } from './run-geo.service';

describe('RunGeoService', () => {
  let service: RunGeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RunGeoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
