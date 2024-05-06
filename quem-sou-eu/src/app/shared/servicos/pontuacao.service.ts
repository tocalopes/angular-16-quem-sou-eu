import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { Pontuacao } from '../models/pontuacao.model';
import { Palavra } from '../models/palavra.model';
import { Jogador } from '../models/jogador.model';

@Injectable({
  providedIn: 'root'
})
export class PontuacaoService {

  partidaIniciada = false;
  partidaEncerrada = true;
  jogadores: Jogador[] = [];

  private api = 'http://localhost:3000/pontuacao';

  constructor(private http: HttpClient) {}

  iniciarPartida(){
    this.clear();
    this.partidaIniciada = true;
    this.partidaEncerrada = false;
  }

  encerrarPartida(){
    this.partidaIniciada = false;
    this.partidaEncerrada = true;
  }

  clear(): void {
    this.getPontuacaoGeral().subscribe(
      pontuacoes => pontuacoes.forEach(p => {
        this.delete(p.id).subscribe();
      })
    )
  }

  delete(id: any): Observable<Palavra> {
    return this.http.delete<Palavra>(this.api + "/" + id);
  }


  getPontuacaoGeral(): Observable<Pontuacao[]> {
    return this.http.get<Pontuacao[]>(this.api);
  }

  getPontuacaoPorIdJogador(idJogador: number): Observable<Pontuacao[]> {
    return this.http.get<Pontuacao[]>(`${this.api}?idJogador=${idJogador}`);
  }

  iniciarPontuacoes(jogadores: Jogador[]){
    // const ob = of({}) ;
    jogadores.forEach(
      jogador => {
        let pontuacao: Pontuacao = {
         idJogador: jogador.idJogador,
         tentativas: 0,
         acertou: false,
         nomeJogador: jogador.nome      
        }
        // ob.pipe(
        //   switchMap(() => this.adicionar(pontuacao))
        // );
        this.adicionar(pontuacao).subscribe(
          p => console.log("Pontuação para jogador " + p.idJogadorCadastro + "criada")
        );
      }
    )
  }

  adicionar(pontuacao: Pontuacao): Observable<Palavra> {
        return this.http.post<Pontuacao>(this.api, pontuacao);
  }

  atualizarPontuacaoJogador(idJogador: any, acertou: boolean): Observable<Palavra> {
    return this.getPontuacaoPorIdJogador(idJogador)
    .pipe(
      switchMap((pontuacaoAntiga: Pontuacao[]) => {
        const pontuacao = pontuacaoAntiga[0];
        pontuacao.acertou = acertou;
        pontuacao.tentativas = pontuacao.tentativas + 1;
        return this.http.put<Pontuacao>(this.api+'/'+pontuacao.id, pontuacao);
      })
    )
  }


}
