import { Component, OnInit } from '@angular/core';
import { Alerta, ResultAlertas } from 'src/app/interface/alerta';
import { EnvioAlertGet, FiltroForm } from 'src/app/interface/search-form';
import { AlertaGeneradaService } from 'src/app/services/alerta-generada.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-reporte-tipo-alerta',
  templateUrl: './reporte-tipo-alerta.component.html',
  styleUrls: ['./reporte-tipo-alerta.component.css']
})
export class ReporteTipoAlertaComponent implements OnInit {
listAlerta?: Array<Alerta>;
url=environment.backendURL;
  constructor(
    private alertaService: AlertaGeneradaService,
  ) { }

  ngOnInit(): void {
  }
  generarReporte(event:FiltroForm){
    const envio: EnvioAlertGet = {
      fechaUno: event.fechaUno,
      fechaDos: event.fechaDos,
      tipoAlerta: event.datoTipo,
    };
    this.alertaService.postAlertaReporte(envio,event.tipo).subscribe(
      (data)=>{
        console.log(data);
        window.location.href=`${this.url}/reporte/alertageneral`
        //this.router.navigateByUrl()
      },(error)=>{
        console.log(error);

      }
    )
  }
}
