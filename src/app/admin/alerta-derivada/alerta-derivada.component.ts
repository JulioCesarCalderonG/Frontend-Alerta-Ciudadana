import { Component, OnInit } from '@angular/core';
import { AlertaDerivada, ResultAlertaDerivadas } from 'src/app/interface/alerta-derivada';
import { AlertaDerivadaService } from 'src/app/services/alerta-derivada.service';

@Component({
  selector: 'app-alerta-derivada',
  templateUrl: './alerta-derivada.component.html',
  styleUrls: ['./alerta-derivada.component.css']
})
export class AlertaDerivadaComponent implements OnInit {

  listAlertaDerivada:AlertaDerivada[]=[];
  tipo:string='0';
  constructor(
    private alertaDerivadaService:AlertaDerivadaService
  ) { }

  ngOnInit(): void {
    this.mostrarAlerta();
  }
  mostrarAlerta(){
    this.alertaDerivadaService.getAlertasDerivadas(this.tipo).subscribe(
      (resp:ResultAlertaDerivadas)=>{
        this.listAlertaDerivada = resp.alertaDerivada;
        console.log(this.listAlertaDerivada);

      }
    )
  }
  borraralerta(id:number){
    console.log(id);

  }
  ShowSelected($event: any) {
    if ($event.target.value === '0') {
      this.tipo = '0';
      this.mostrarAlerta();
    }
    if ($event.target.value === '1') {
      this.tipo = '1';
      this.mostrarAlerta();
    }
  }
}
