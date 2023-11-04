import { TestBed } from '@angular/core/testing';

import { JobapplyService } from './jobapply.service';

describe('JobapplyService', () => {
  let service: JobapplyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobapplyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
