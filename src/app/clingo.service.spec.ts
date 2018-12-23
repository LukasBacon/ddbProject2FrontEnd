import { TestBed } from '@angular/core/testing';

import { ClingoService } from './clingo.service';

describe('ClingoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClingoService = TestBed.get(ClingoService);
    expect(service).toBeTruthy();
  });
});
