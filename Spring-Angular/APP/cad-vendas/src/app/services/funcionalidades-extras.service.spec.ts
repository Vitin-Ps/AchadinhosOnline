import { TestBed } from '@angular/core/testing';

import { FuncionalidadesExtrasService } from './funcionalidades-extras.service';

describe('FuncionalidadesExtrasService', () => {
  let service: FuncionalidadesExtrasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuncionalidadesExtrasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
