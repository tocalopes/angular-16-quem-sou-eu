import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Palavra } from 'src/app/shared/models/palavra.model';

@Injectable({
  providedIn: 'root',
})
export class PalavraService {
  private api = 'http://localhost:3000/palavras';

  constructor(private http: HttpClient) {}

  getPalavras(): Observable<Palavra[]> {
    return this.http.get<Palavra[]>(this.api);
  }

  getPalavraByIdJogadorResponde(
    idJogadorResponde: number
  ): Observable<Palavra[]> {
    return this.http.get<Palavra[]>(
      `${this.api}?IdJogadorResponde=${idJogadorResponde}`
    );
  }

  clear(id: any): Observable<Palavra> {
    return this.http.delete<Palavra>(this.api + "/" + id);
  }

  adicionar(palavra: Palavra): Observable<Palavra> {
    return this.getPalavras()
    .pipe(
      switchMap((palavras: Palavra[]) => {
        palavra.idPalavra = palavras.length + 1;
        return this.http.post<Palavra>(this.api, palavra);
      })
    )
  }
}
