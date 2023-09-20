import { TestBed } from '@angular/core/testing';

import { FormBuscaServiceService } from './form-busca-service.service';

describe('FormBuscaServiceService', () => {
  let service: FormBuscaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormBuscaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
