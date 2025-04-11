import { TestBed } from '@angular/core/testing';

import { RunHistoryService } from './run-history.service';

describe('RunHistoryService', () => {
  let service: RunHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RunHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
