import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstruturaQuestionamento } from 'src/app/shared/models/estruturaQuestionamento.model';
import { QuemPerguntaQuemRespondeService } from 'src/app/shared/servicos/quem-pergunta-quem-responde.service';
import { PalavraService } from './servicos/palavra.service';
import { Palavra } from 'src/app/shared/models/palavra.model';
import { PontuacaoService } from 'src/app/shared/servicos/pontuacao.service';
import { Jogador } from 'src/app/shared/models/jogador.model';

@Component({
  selector: 'app-cadastro-palavra',
  templateUrl: './cadastro-palavra.component.html',
  styleUrls: ['./cadastro-palavra.component.scss'],
})
export class CadastroPalavraComponent implements OnInit{
  constructor(
    private router: Router,
    private route:ActivatedRoute,
    public quemPerguntaERespondeService: QuemPerguntaQuemRespondeService,
    private palavraService: PalavraService,
    private pontuacaoService: PontuacaoService) {}
  
  index: number = 0;
  perguntaResponde: EstruturaQuestionamento = {};
  palavraFormControl = new FormControl('');

  ngOnInit(): void {
    this.getIndex();
    this.onStart();
  }

  getIndex(): void {
    let i = this.route.snapshot.paramMap.get('indice')?.toString();
    console.log(i);
    let indexString = '';
    if(i){
      indexString = i.toString();
    }
    this.index = parseInt(indexString,10);
    if(this.index === 0){
      this.palavraService.getPalavras().subscribe(
        p => {
          p.forEach(palavra => this.delete(palavra.id));
        }
      )
    }
    console.log(this.index);
  }

  private delete(id: any): void {
    this.palavraService.clear(id).subscribe({
      next: () => {
        console.log('Registros limpos com sucesso!');
        // Faça qualquer outra ação necessária após limpar os registros
      },
      error: (error) => {
        console.error('Ocorreu um erro ao limpar os registros:', error);
      }
    });;
  }

  onStart(): void {
    this.palavraFormControl = new FormControl('');
    this.perguntaResponde = this.quemPerguntaERespondeService.getData()[this.index];
    console.log(this.perguntaResponde);
    console.log(this.quemPerguntaERespondeService.getData());
  }


  voltar() {
    if(this.index === 0){
      this.router.navigate(['']);
    }else{
      this.index = this.index - 1;
      this.onStart();
    }
    
  }

  proximo() {
    let palavra: Palavra = {
      idJogadorCadastro : this.perguntaResponde.jogadorQuePergunta?.idJogador,
      idJogadorResponde : this.perguntaResponde.jogadorQueResponde?.idJogador,
      palavra: this.palavraFormControl.value
    }
    this.palavraService.adicionar(palavra).subscribe( r => {
      if(this.index === this.quemPerguntaERespondeService.getData().length - 1){
        let perguntas: EstruturaQuestionamento[] = this.quemPerguntaERespondeService.getData();
        let jogadores: Jogador[] = perguntas.filter(e => e != undefined).map(e => e.jogadorQuePergunta) as Jogador[];
        this.pontuacaoService.iniciarPartida();
        this.pontuacaoService.iniciarPontuacoes(jogadores);
        this.router.navigate(['/quem-sou-eu']);
      }else{
        this.index = this.index + 1;
        this.onStart();
      }
    })

  }
}
