import { Injectable } from '@angular/core';
import { EstruturaQuestionamento } from '../models/estruturaQuestionamento.model';

@Injectable({
  providedIn: 'root'
})
export class QuemPerguntaQuemRespondeService {

  constructor() { }
  quemPerguntaQuemResponde: EstruturaQuestionamento[] = [];
  jogadorAtualIndice = 0;

  getJogadorAtual(): EstruturaQuestionamento{
    return this.getData()[this.jogadorAtualIndice];
  }

  proximoJogador(): void {
    if(this.jogadorAtualIndice < this.getData().length - 1){
      this.jogadorAtualIndice++;
    }else{
      this.jogadorAtualIndice = 0;
    }
  }

  setData(estruturaQuestionamento: EstruturaQuestionamento[]){
    this.quemPerguntaQuemResponde = estruturaQuestionamento;
  }

  getData() :  EstruturaQuestionamento[]{
    return this.quemPerguntaQuemResponde;
  }

  clean() {
    this.quemPerguntaQuemResponde = [];
  }
}
