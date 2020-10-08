import { TestBed } from '@angular/core/testing';

import { EstacionXEstacionService } from './estacion-x-estacion.service';

describe('EstacionXEstacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstacionXEstacionService = TestBed.get(EstacionXEstacionService);
    expect(service).toBeTruthy();
  });
});
