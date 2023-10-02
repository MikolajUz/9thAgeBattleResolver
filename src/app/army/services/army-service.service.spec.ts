import { TestBed } from '@angular/core/testing';

import { ArmyServiceService } from './army-service.service';

describe('ArmyServiceService', () => {
  let service: ArmyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArmyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
