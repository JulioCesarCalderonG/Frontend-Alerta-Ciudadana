import { Component, OnInit } from '@angular/core';
import { LocalizacionService } from 'src/app/services/localizacion.service';

@Component({
  selector: 'app-alerta-derivada',
  templateUrl: './alerta-derivada.component.html',
  styleUrls: ['./alerta-derivada.component.css']
})
export class AlertaDerivadaComponent implements OnInit {

  constructor(
    private locationService:LocalizacionService
  ) { }

  ngOnInit(): void {
  }
  get isAdminLocation(){
    return this.locationService.isUserLocationReady;
  }

}
