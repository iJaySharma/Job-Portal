import { TestBed } from '@angular/core/testing';

import { SeeprofileService } from './seeprofile.service';

describe('SeeprofileService', () => {
  let service: SeeprofileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeeprofileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
