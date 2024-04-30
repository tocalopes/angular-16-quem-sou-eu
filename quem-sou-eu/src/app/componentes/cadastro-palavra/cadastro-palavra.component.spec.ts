import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPalavraComponent } from './cadastro-palavra.component';

describe('CadastroPalavraComponent', () => {
  let component: CadastroPalavraComponent;
  let fixture: ComponentFixture<CadastroPalavraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroPalavraComponent]
    });
    fixture = TestBed.createComponent(CadastroPalavraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
