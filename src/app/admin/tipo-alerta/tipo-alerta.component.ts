import { Component, OnInit } from '@angular/core';
import { ResultTipoAlerta, Tipoalerta } from 'src/app/interface/tipo-alerta';
import { TipoAlertaService } from 'src/app/services/tipo-alerta.service';

@Component({
  selector: 'app-tipo-alerta',
  templateUrl: './tipo-alerta.component.html',
  styleUrls: ['./tipo-alerta.component.css']
})
export class TipoAlertaComponent implements OnInit {

  estado:string="1";
  listTipoAlerta?:Array<Tipoalerta>;
  constructor(private tipoAlertaService:TipoAlertaService) { }

  ngOnInit(): void {
    this.mostrarTipoAlertas();
  }
  mostrarTipoAlertas(){
    this.tipoAlertaService.getTipoAlerta(this.estado).subscribe(
      (data:ResultTipoAlerta)=>{
        this.listTipoAlerta = data.tipoalerta;
        console.log(this.listTipoAlerta);
        
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
  borrartipoAlerta(id:any, estado:string){

  }
  ShowSelected($event: any) {
    if ($event.target.value === '1') {
      this.estado = '1';
      this.mostrarTipoAlertas();
    }
    if ($event.target.value === '2') {
      this.estado = '0';
      this.mostrarTipoAlertas();
    }
  }
}
