import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jogador } from 'src/app/shared/models/jogador.model';



@Injectable({
  providedIn: 'root'
})
export class JogadorService {

  private api = 'http://localhost:3000/pessoas';

  constructor(private http: HttpClient){}

  getJogadores(): Observable<Jogador[]> {
    return this.http.get<Jogador[]>(this.api);
  }
}
