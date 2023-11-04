import { TestBed } from '@angular/core/testing';

import { JobdescriptionService } from './jobdescription.service';

describe('JobdescriptionService', () => {
  let service: JobdescriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobdescriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
