import { TestBed } from '@angular/core/testing';

import { CurrentRoosterService } from './rooster.service';

describe('CurrentRoosterService', () => {
  let service: CurrentRoosterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentRoosterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
