import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JogadorService } from './servicos/jogador.service';
import { Jogador } from 'src/app/shared/models/jogador.model';
import { EstruturaQuestionamento } from 'src/app/shared/models/estruturaQuestionamento.model';
import { QuemPerguntaQuemRespondeService } from 'src/app/shared/servicos/quem-pergunta-quem-responde.service';

@Component({
  selector: 'app-cadastro-jogador',
  templateUrl: './cadastro-jogador.component.html',
  styleUrls: ['./cadastro-jogador.component.scss'],
})
export class CadastroJogadorComponent implements OnInit {
  jogadoresFormulario = new FormControl('');
  jogadores: Jogador[] = [];
  isLoading = true;
  formGroup = new FormGroup({});

  constructor(
    private router: Router,
    private jogadorService: JogadorService,
    private quemPerguntaERespondeService: QuemPerguntaQuemRespondeService
  ) {}
  ngOnInit(): void {
    this.onStart();
  }

  onStart(): void {
    this.jogadorService.getJogadores().subscribe((jogadores: Jogador[]) => {
      jogadores.forEach((jogador, index) => {
        this.formGroup.addControl(
          'jogador' + index,
          new FormControl(jogador.nome)
        );

        this.jogadores.push(jogador);
      });
      this.formGroup.addControl(
        'jogador' + this.jogadores.length,
        new FormControl('')
      );
      this.jogadores.push({ idJogador: 0, nome: '' });
      this.isLoading = false;
    });
  }

  adicionarJogador(index: number): void {
    this.jogadorService
      .adicionar(this.formGroup.get('jogador' + index)?.value)
      .subscribe((r) => {
        this.formGroup = new FormGroup({});
        this.isLoading = true;
        this.jogadores = [];
        this.onStart();
      });
  }

  cadastrarPalavras() {
    this.quemPerguntaERespondeService.setData(this.ordenarQuemPergunta());
    this.router.navigate(['cadastrar-palavras', 0]);
  }

  private ordenarQuemPergunta(): EstruturaQuestionamento[] {
    let perguntasRespostas: EstruturaQuestionamento[] = [];
    let jogaresFiltrados: Jogador[] = this.jogadores.filter(
      (jogador) => jogador.idJogador !== 0
    );
    jogaresFiltrados = jogaresFiltrados.sort(() => Math.random() - 0.5);
    jogaresFiltrados.forEach((jogador, i) => {
      if (i < jogaresFiltrados.length - 1) {
        perguntasRespostas.push({
          jogadorQuePergunta: jogador,
          jogadorQueResponde: jogaresFiltrados[i + 1],
        });
      } else {
        perguntasRespostas.push({
          jogadorQuePergunta: jogador,
          jogadorQueResponde: jogaresFiltrados[0],
        });
      }
    });
    return perguntasRespostas;
  }
}
