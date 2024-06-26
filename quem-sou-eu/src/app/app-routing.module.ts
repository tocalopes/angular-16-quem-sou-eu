import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroJogadorComponent } from './componentes/cadastro-jogador/cadastro-jogador.component';
import { CadastroPalavraComponent } from './componentes/cadastro-palavra/cadastro-palavra.component';
import { QuemSouEuComponent } from './componentes/quem-sou-eu/quem-sou-eu.component';

const routes: Routes = [
  {
    path: '', 
    redirectTo: '/cadastrar-jogadores',
    pathMatch: 'full'
  },
  {
    path: 'cadastrar-jogadores',
    component: CadastroJogadorComponent
  },
  {
    path: 'cadastrar-palavras/:indice',
    component: CadastroPalavraComponent
  },
  {
    path: 'quem-sou-eu',
    component: QuemSouEuComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
