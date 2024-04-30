import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroJogadorComponent } from './componentes/cadastro-jogador/cadastro-jogador.component';

const routes: Routes = [
  {
    path: '',
    component: CadastroJogadorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
