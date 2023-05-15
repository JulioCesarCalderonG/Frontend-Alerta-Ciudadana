import { Component, OnInit } from '@angular/core';
import { LocalizacionService } from 'src/app/services/localizacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario, ResultUsuarios } from '../../interface/usuario';
import { WebsocketService } from 'src/app/socket/websocket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {


  constructor(
    private locationService:LocalizacionService,
    private usuarioService: UsuarioService,
    private ws: WebsocketService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
  this.mostrarAlertaSocket();
  }

  get isAdminLocation(){
    return this.locationService.isUserLocationReady;
  }
  mostrarAlertaSocket() {
    this.ws.listen('actualizar-alerta-general').subscribe(
      (data) => {
        this.toastr.success(
          'Tienes una alerta ciudadana entrante',
          'Alerta Ciudadana'
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
