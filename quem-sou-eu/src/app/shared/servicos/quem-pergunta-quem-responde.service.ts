import { Injectable } from '@angular/core';
import { EstruturaQuestionamento } from '../models/estruturaQuestionamento.model';

@Injectable({
  providedIn: 'root'
})
export class QuemPerguntaQuemRespondeService {

  constructor() { }
  quemPerguntaQuemResponde: EstruturaQuestionamento[] = [];

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
