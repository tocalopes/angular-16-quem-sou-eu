import { TestBed } from '@angular/core/testing';

import { QuemPerguntaQuemRespondeService } from './quem-pergunta-quem-responde.service';

describe('QuemPerguntaQuemRespondeService', () => {
  let service: QuemPerguntaQuemRespondeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuemPerguntaQuemRespondeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
