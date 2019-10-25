import { TestBed, inject } from '@angular/core/testing';

import { CanalServiceService } from './canal-service.service';

describe('CanalServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanalServiceService]
    });
  });

  it('should be created', inject([CanalServiceService], (service: CanalServiceService) => {
    expect(service).toBeTruthy();
  }));
});
