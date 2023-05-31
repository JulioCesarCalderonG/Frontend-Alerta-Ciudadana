import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { LocalizacionService } from '../../services/localizacion.service';

@Component({
  selector: 'app-btn-mi-locacion',
  templateUrl: './btn-mi-locacion.component.html',
  styleUrls: ['./btn-mi-locacion.component.css']
})
export class BtnMiLocacionComponent {

  constructor(
    private locationService:LocalizacionService,
    private mapService:MapService
  ) { }
  goToMyLocation(){
    if(!this.locationService.isUserLocationReady) throw Error('No hay ubicacion del usuario');
    if(!this.mapService.isMapReady) throw Error('No se ha inicializado el mapa')
    this.mapService.flyTo(this.locationService.useLocationAdmin!);

  }

}
