import { TestBed } from '@angular/core/testing';

import { HorarioRutaService } from './horario-ruta.service';

describe('HorarioRutaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HorarioRutaService = TestBed.get(HorarioRutaService);
    expect(service).toBeTruthy();
  });
});
