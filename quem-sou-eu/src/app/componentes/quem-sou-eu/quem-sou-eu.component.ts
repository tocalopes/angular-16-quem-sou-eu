import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { PontuacaoService } from 'src/app/shared/servicos/pontuacao.service';
import { QuemPerguntaQuemRespondeService } from 'src/app/shared/servicos/quem-pergunta-quem-responde.service';
import { PalavraService } from '../cadastro-palavra/servicos/palavra.service';
import { Palavra } from 'src/app/shared/models/palavra.model';
import { EstruturaQuestionamento } from 'src/app/shared/models/estruturaQuestionamento.model';

@Component({
  selector: 'app-quem-sou-eu',
  templateUrl: './quem-sou-eu.component.html',
  styleUrls: ['./quem-sou-eu.component.scss'],
})
export class QuemSouEuComponent implements OnInit {
  
  palavra: Palavra = {};
  isLoading = true;
  quemPerguntaEResponde: EstruturaQuestionamento = {};

  ngOnInit(): void {    
    this.palavraService
    .getPalavraByIdJogadorResponde(
      this.quemPerguntaERespondeService.getJogadorAtual().jogadorQueResponde?.idJogador)
    .subscribe((palavras: Palavra[]) => {
      this.palavra = palavras[0];
      this.quemPerguntaEResponde = this.quemPerguntaERespondeService.getJogadorAtual();
      this.isLoading = false;
    });
  }

  constructor(
    public quemPerguntaERespondeService: QuemPerguntaQuemRespondeService,
    private pontuacaoService: PontuacaoService,
    private palavraService: PalavraService
  ) {}

  public tempo: number = 60;
  public iniciado: boolean = false;
  private cronometro: Subscription = new Observable().subscribe();


  iniciar() {
    this.iniciado = true;
    this.cronometro = interval(1000).subscribe(() => {
      this.tempo--;
      if (this.tempo === 0) {
      }
    });
  }

  parar() {
    this.cronometro.unsubscribe();
  }
}
