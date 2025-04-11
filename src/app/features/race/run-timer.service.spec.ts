import { TestBed } from '@angular/core/testing';

import { RunTimerService } from './run-timer.service';

describe('RunTimerService', () => {
  let service: RunTimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RunTimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
