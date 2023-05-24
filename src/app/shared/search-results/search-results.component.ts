import { Component, Output, EventEmitter } from '@angular/core';
import { Alerta, AlertaFiltrada } from 'src/app/interface/alerta-filtrada';
import { AlertaService } from 'src/app/services/alerta.service';
import { MapService } from 'src/app/services/map.service';
import { LocalizacionService } from '../../services/localizacion.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {

  selectId:number=0;
  @Output('codigo') codigoEmiter = new EventEmitter<any>();
  @Output('codigoId') codigoEmiterId = new EventEmitter<any>();
  @Output('idAlerta') codigoEmiterAlerta = new EventEmitter<any>();
  constructor(
    private alertaService:AlertaService,
    private mapService:MapService,
    private locationService:LocalizacionService
  ) { }

  get isLoadingAlertas():boolean{
    return this.alertaService.isCargaDatos;
  }
  get alertaFiltro():Alerta[]{
    return this.alertaService.listAlertas;
  }
  flyTo(alerta:Alerta){
    this.selectId = alerta.id;
    const {lat, lng} = alerta;
    this.mapService.flyTo({lng,lat})
  }
  mostrarRuta(alerta:Alerta){
    if(!this.locationService.useLocation) throw Error('No tenemos la localizacion inicializacion');
    const start =this.locationService.useLocation;
    const end = [alerta.lng,alerta.lat] as [number,number]
    this.mapService.getRutaAlerta(start,end)
  }
  codigoAlerta(codigos:any){
    this.codigoEmiter.emit(codigos);
  }
  codigoIdAlerta(codigoId:any){
    this.codigoEmiterId.emit(codigoId);
  }
  registrarAlerta(idAlerta:any){
    this.codigoEmiterAlerta.emit(idAlerta)

  }
}
