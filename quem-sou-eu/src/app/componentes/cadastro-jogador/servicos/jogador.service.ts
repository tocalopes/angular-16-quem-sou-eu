import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Jogador } from 'src/app/shared/models/jogador.model';



@Injectable({
  providedIn: 'root'
})
export class JogadorService {

  private api = 'http://localhost:3000/jogadores';

  constructor(private http: HttpClient){}

  getJogadores(): Observable<Jogador[]> {
    return this.http.get<Jogador[]>(this.api);
  }

  getJogadorById(idJogador: number): Observable<Jogador[]> {
    return this.http.get<Jogador[]>(`${this.api}?idJogador=${idJogador}`);
  }

  adicionar(nome: string): Observable<Jogador> {
    return this.getJogadores()
      .pipe(
        switchMap((jogadores: Jogador[]) => {
          let jogador: Jogador = {
            idJogador: jogadores.length+1,
            nome: nome
          }
          return this.http.post<Jogador>(this.api, jogador);
        })
      )
  }
}
