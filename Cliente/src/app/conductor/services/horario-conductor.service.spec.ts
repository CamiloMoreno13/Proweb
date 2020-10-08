import { TestBed } from '@angular/core/testing';

import { HorarioConductorService } from './horario-conductor.service';

describe('HorarioConductorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HorarioConductorService = TestBed.get(HorarioConductorService);
    expect(service).toBeTruthy();
  });
});
