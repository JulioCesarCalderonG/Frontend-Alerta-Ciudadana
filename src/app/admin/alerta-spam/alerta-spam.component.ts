import { Component, OnInit } from '@angular/core';
import { closeAlert, loadData } from 'src/app/alerts/load';
import { AlertaSpam, ResultAlertaSpam } from 'src/app/interface/alerta-spam';
import { SpamService } from 'src/app/services/spam.service';

@Component({
  selector: 'app-alerta-spam',
  templateUrl: './alerta-spam.component.html',
  styleUrls: ['./alerta-spam.component.css']
})
export class AlertaSpamComponent implements OnInit {
  carga:boolean=true;
  listSpam:AlertaSpam[]=[];
    p: number = 1;
  constructor(private alertaServ:SpamService) { }

  ngOnInit(): void {
    this.mostrarSpam();
  }
  mostrarSpam(){
    this.carga=false;
    if (!this.carga) {
      loadData('Cargando Datos','Se estan cargando los datos de alertas spam');
    }
    this.alertaServ.getSpam().subscribe({
      next:(data:ResultAlertaSpam)=>{
        
        this.listSpam=data.alerta;
        this.carga=true;
        setTimeout(() => {
          if (this.carga) {
            closeAlert();
          }
        }, 1000);
      },
      error:error=>{
        console.log(error);
         this.carga=true;
        setTimeout(() => {
          if (this.carga) {
            closeAlert();
          }
        }, 1000);
      }
    })
  }
}
