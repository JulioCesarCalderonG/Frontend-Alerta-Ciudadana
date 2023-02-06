import { Component, OnInit } from '@angular/core';
import { LocalizacionService } from 'src/app/services/localizacion.service';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {

  constructor(
    private locationService:LocalizacionService
  ) { }

  ngOnInit(): void {
  }
  
  get isAdminLocation(){
    return this.locationService.isUserLocationReady;
  }

}
