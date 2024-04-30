import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JogadorService } from './servicos/jogador.service';
import { Jogador } from 'src/app/shared/models/jogador.model';

@Component({
  selector: 'app-cadastro-jogador',
  templateUrl: './cadastro-jogador.component.html',
  styleUrls: ['./cadastro-jogador.component.scss']
})
export class CadastroJogadorComponent implements OnInit{
  jogadoresFormulario = new FormControl('');
  jogadores: Jogador[] = [];
  isLoading = true;
  formGroup = new FormGroup({

  });

  constructor(private router: Router,
    private jogadorService: JogadorService
  ){

  }
  ngOnInit(): void {
    this.onStart();
  }

  onStart(): void{
    console.log(this.jogadores);
    console.log(this.formGroup);
    this.jogadorService.getJogadores().subscribe(
      (jogadores: Jogador[]) => {
        jogadores.forEach(
          (jogador,index) => {
            this.formGroup.addControl('jogador'+index,new FormControl(jogador.nome));
            console.log(this.formGroup.get('jogador'+index));
            this.jogadores.push(jogador)
          }
        )
      this.formGroup.addControl('jogador'+this.jogadores.length,new FormControl(''))
      this.jogadores.push({idJogador: 0,nome:''});
      this.isLoading = false;
      console.log(this.formGroup.controls)
      }
    );
  }

  adicionarJogador(index: number): void {
    console.log(index);
    this.jogadorService.adicionar(this.formGroup.get('jogador'+index)?.value).subscribe(
      r => {
        this.formGroup = new FormGroup({});
        this.isLoading = true;
        this.jogadores = [];
        this.onStart()
      }
    );
  }

  cadastrarPalavras(){
    const navigationExtras = {
      state: {
        jogadores: this.jogadores,
        indice: 0
      }
    };
    this.router.navigate(['cadastrar-palavras'], navigationExtras);
  }
}
