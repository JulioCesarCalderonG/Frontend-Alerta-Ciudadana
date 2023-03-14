import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertaDerivadaService } from '../../services/alerta-derivada.service';
import { AlertaDerivada } from 'src/app/interface/alerta-derivada-filtrada';
import { MapService } from '../../services/map.service';
import { LocalizacionService } from '../../services/localizacion.service';

@Component({
  selector: 'app-search-results-sereno',
  templateUrl: './search-results-sereno.component.html',
  styleUrls: ['./search-results-sereno.component.css']
})
export class SearchResultsSerenoComponent {
  selectId:number=0;
  @Output('alerta') codigoEmiter = new EventEmitter<any>();
  constructor(
    private alertaService: AlertaDerivadaService,
    private mapService:MapService,
    private locationService:LocalizacionService
  ) { }

  get isLoadingAlertas():boolean{
    return this.alertaService.isCargaDatos;
  }
  get alertaFiltro():AlertaDerivada[]{
    return this.alertaService.listAlerta;
  }
  flyTo(alerta:AlertaDerivada){
    this.selectId = alerta.id;
    const {lat, lng} = alerta.Alertum;
    this.mapService.flyTo2({lng,lat})
  }
  mostrarRuta(alerta:AlertaDerivada){
    if(!this.locationService.useLocation) throw Error('No tenemos la localizacion inicializacion');
    const start =this.locationService.useLocation;
    const end = [alerta.Alertum.lng,alerta.Alertum.lat] as [number,number]
    this.mapService.getRutaAlerta(start,end)
  }
  actualizarAlerta(id:number){
    this.codigoEmiter.emit(id);
  }
}
