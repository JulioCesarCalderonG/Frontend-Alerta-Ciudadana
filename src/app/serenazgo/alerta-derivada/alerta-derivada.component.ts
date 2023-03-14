import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LocalizacionService } from 'src/app/services/localizacion.service';
import { MapSerenazgoService } from '../../services/map-serenazgo.service';
import { AlertaDerivadaService } from '../../services/alerta-derivada.service';

@Component({
  selector: 'app-alerta-derivada',
  templateUrl: './alerta-derivada.component.html',
  styleUrls: ['./alerta-derivada.component.css']
})
export class AlertaDerivadaComponent implements AfterViewInit {

  constructor(
    private locationService:LocalizacionService
  ) { }

  ngAfterViewInit(): void {
  }
  get isAdminLocation(){
    return this.locationService.isUserLocationReady;
  }

}
