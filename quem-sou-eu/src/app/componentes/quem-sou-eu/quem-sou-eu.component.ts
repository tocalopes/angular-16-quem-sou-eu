import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { PontuacaoService } from 'src/app/shared/servicos/pontuacao.service';
import { QuemPerguntaQuemRespondeService } from 'src/app/shared/servicos/quem-pergunta-quem-responde.service';
import { PalavraService } from '../cadastro-palavra/servicos/palavra.service';
import { Palavra } from 'src/app/shared/models/palavra.model';
import { EstruturaQuestionamento } from 'src/app/shared/models/estruturaQuestionamento.model';
import { Pontuacao } from 'src/app/shared/models/pontuacao.model';




@Component({
  selector: 'app-quem-sou-eu',
  templateUrl: './quem-sou-eu.component.html',
  styleUrls: ['./quem-sou-eu.component.scss'],
})
export class QuemSouEuComponent implements OnInit {
  palavra: Palavra = {};
  isLoading = true;
  quemPerguntaEResponde: EstruturaQuestionamento = {};
  isFinalizado = false;
  fimDeJogo = false;
  burro = false;
  ofensa = '';
  pontuacaoFinal: Pontuacao[] = [];
  OFENSAS = [
    "MAS VOCÊ É MUITO BURRINHO MESMO",
    "SUA MÃE SABE QUE VOCÊ É UM ANTA",
    "SENTA LÁ ANTA",
    "ISSO QUE DÁ PULAR O ENSINO FUNDAMENTAL"
  ]

  
  constructor(
    public quemPerguntaERespondeService: QuemPerguntaQuemRespondeService,
    private pontuacaoService: PontuacaoService,
    private palavraService: PalavraService
  ) {}

  public tempo: number = 60;
  public iniciado: boolean = false;
  private cronometro: Subscription = new Observable().subscribe();


  ngOnInit(): void {
    this.start();
  }

  start() {
    this.isLoading = true;
    if(this.quemPerguntaERespondeService.getData().length > 0){
    this.isFinalizado = false;
    this.iniciado = false;
    this.tempo = 60;
    this.palavraService
      .getPalavraByIdJogadorResponde(
        this.quemPerguntaERespondeService.getJogadorAtual().jogadorQueResponde
          ?.idJogador
      )
      .subscribe((palavras: Palavra[]) => {
        if (palavras.length === 0) {
          this.isLoading = false;
          this.fimDeJogo = true;
        } else {
          this.palavra = palavras[0];
          this.quemPerguntaEResponde =
          this.quemPerguntaERespondeService.getJogadorAtual();
          this.isLoading = false;
        }
      });
    }else{
      this.isLoading = true;
      this.pontuacaoService.getPontuacaoGeral()
        .subscribe( (pontuacoes: Pontuacao[]) => {
          this.fimDeJogo = true;
          this.pontuacaoFinal = pontuacoes.sort((pa,pb) => pa.tentativas - pb.tentativas);
          this.isLoading = true;
        })
    }
  }

  iniciar() {
    this.iniciado = true;
    this.cronometro = interval(1000).subscribe(() => {
      this.tempo--;
      if (this.tempo === 0) {
        this.parar();
      }
    });
  }

  parar() {
    this.cronometro.unsubscribe();
    this.isFinalizado = true;
  }

  acertou() {
    this.pontuacaoService
      .atualizarPontuacaoJogador(
        this.quemPerguntaERespondeService.getJogadorAtual().jogadorQueResponde
          ?.idJogador,
        true
      )
      .subscribe((r) => {
        this.quemPerguntaERespondeService.removerJogador(this.quemPerguntaEResponde.jogadorQueResponde?.idJogador);
        this.quemPerguntaERespondeService.proximoJogador();
        this.palavra.ativo = 'N';
        this.palavraService
          .atualizar(this.palavra)
          .subscribe((r) => this.start());
      });
  }

  errou() {
    this.pontuacaoService
      .atualizarPontuacaoJogador(
        this.quemPerguntaERespondeService.getJogadorAtual().jogadorQueResponde
          ?.idJogador,
        false
      )
      .subscribe((r) => {
        setTimeout(() => {
          this.burro = true;
          this.ofensa = this.OFENSAS.sort(() => Math.random() - 0.5)[0];
        },5000);
        this.quemPerguntaERespondeService.proximoJogador();
        this.palavra.ativo = 'S';
        this.burro = false;
        this.ofensa = '';
        this.start();
      });
  }
}
