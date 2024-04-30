import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-palavra',
  templateUrl: './cadastro-palavra.component.html',
  styleUrls: ['./cadastro-palavra.component.scss'],
})
export class CadastroPalavraComponent {
  constructor(private router: Router) {}

  jogadorFormControl = new FormControl('');

  voltar() {
    this.router.navigate([''], {});
  }

  proximo() {
    this.router.navigate([''], {});
  }
}
