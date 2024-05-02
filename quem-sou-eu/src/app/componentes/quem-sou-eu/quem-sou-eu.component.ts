import { Component } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-quem-sou-eu',
  templateUrl: './quem-sou-eu.component.html',
  styleUrls: ['./quem-sou-eu.component.scss']
})
export class QuemSouEuComponent {
  public tempo: number = 60;
  public iniciado: boolean = false;
  private cronometro: Subscription = new Observable().subscribe();


  iniciar(){
    this.iniciado = true;
    this.cronometro = interval(1000).subscribe(() => {
      this.tempo--;
      if(this.tempo === 0){

      }
    })
  }

  parar(){
    this.cronometro.unsubscribe();
  }


}
