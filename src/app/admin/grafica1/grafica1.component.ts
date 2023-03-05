import { Component, OnInit } from '@angular/core';
import { LocalizacionService } from 'src/app/services/localizacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario, ResultUsuarios } from '../../interface/usuario';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {


  constructor(
    private locationService:LocalizacionService,
    private usuarioService: UsuarioService
  ) {
  }

  ngOnInit(): void {

  }

  get isAdminLocation(){
    return this.locationService.isUserLocationReady;
  }

}
