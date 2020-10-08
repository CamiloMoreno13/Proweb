import { TestBed } from '@angular/core/testing';

import { HorarioBusService } from './horario-bus.service';

describe('HorarioBusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HorarioBusService = TestBed.get(HorarioBusService);
    expect(service).toBeTruthy();
  });
});
