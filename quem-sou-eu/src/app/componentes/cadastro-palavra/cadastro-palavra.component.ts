import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstruturaQuestionamento } from 'src/app/shared/models/estruturaQuestionamento.model';
import { QuemPerguntaQuemRespondeService } from 'src/app/shared/servicos/quem-pergunta-quem-responde.service';

@Component({
  selector: 'app-cadastro-palavra',
  templateUrl: './cadastro-palavra.component.html',
  styleUrls: ['./cadastro-palavra.component.scss'],
})
export class CadastroPalavraComponent implements OnInit{
  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private quemPerguntaERespondeService: QuemPerguntaQuemRespondeService) {}
  
  index: number = 0;
  perguntaResponde: EstruturaQuestionamento = {};

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
    console.log(this.index);
  }

  onStart(): void {
    this.perguntaResponde = this.quemPerguntaERespondeService.getData()[this.index];
    console.log(this.perguntaResponde);
    console.log(this.quemPerguntaERespondeService.getData());
  }

  jogadorFormControl = new FormControl('');

  voltar() {
    if(this.index === 0){
      this.router.navigate(['']);
    }else{
      this.index = this.index - 1;
      this.onStart();
    }
    
  }

  proximo() {
    if(this.index === this.quemPerguntaERespondeService.getData().length - 1){
      this.router.navigate(['']);
    }else{
      this.index = this.index + 1;
      this.onStart();
    }
  }
}
