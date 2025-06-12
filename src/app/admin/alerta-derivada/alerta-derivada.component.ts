import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertaDerivada, ResultAlertaDerivada, ResultAlertaDerivadas } from 'src/app/interface/alerta-derivada';
import { ResultUsuarios, Usuario } from 'src/app/interface/usuario';
import { AlertaDerivadaService } from 'src/app/services/alerta-derivada.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { WebsocketService } from 'src/app/socket/websocket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alerta-derivada',
  templateUrl: './alerta-derivada.component.html',
  styleUrls: ['./alerta-derivada.component.css']
})
export class AlertaDerivadaComponent implements OnInit {

  listAlertaDerivada:AlertaDerivada[]=[];
  public listUsuario: Usuario[] = [];
  tipo:string='0';
  serenoForm:FormGroup;
  codigoAlerta:number = 0;
  p: number = 1;
  constructor(
    private alertaDerivadaService:AlertaDerivadaService,
    private usuarioService: UsuarioService,
    private fb:FormBuilder,
    private ws:WebsocketService
  ) {
    this.serenoForm = this.fb.group({
      sereno:['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.mostrarAlerta();
    this.mostrarSereno();
    this.wsSerenazgoLogin();
    this.wsSerenazgoLogout();
  }
  mostrarAlerta(){
    this.alertaDerivadaService.getAlertasDerivadas(this.tipo).subscribe(
      (resp:ResultAlertaDerivadas)=>{
        
        
        this.listAlertaDerivada = resp.alertaDerivada;
        
      }
    )
  }
  mostrarSereno(){
    this.usuarioService.getSerenazgo().subscribe(
      (resp:ResultUsuarios)=>{
        this.listUsuario = resp.usuario;

      }
    )
  }
  actualizarAlerta(){
    const formData = new FormData();
    formData.append('id_usuario',this.serenoForm.get('sereno')?.value);
    this.alertaDerivadaService.putAlertaDerivada(formData, this.codigoAlerta).subscribe(
      (resp)=>{
        Swal.fire(
          'Actualizado!',
          'Se ha actualizado con exito',
          'success'
        );
        this.ws.emit('actualizar-alerta-derivada');
        this.ws.emit(`alerta-derivada`, {
          titulo: 'Alerta Nueva',
          msg: 'Porfavor verifica su ubicacion y acerquese al lugar',
          usuario: `${this.serenoForm.get('sereno')?.value}`,
        },(data:any)=>{
          console.log(data);
        });
        this.mostrarAlerta();
      }
    )
  }
  wsSerenazgoLogin(){
    this.ws.listen('inicio-sesion').subscribe(
      (resp)=>{
        this.mostrarSereno();
      },
      (error)=>{
        console.log(error);

      }
    )
  }
  wsSerenazgoLogout(){
    this.ws.listen('logout-sesion').subscribe(
      (resp)=>{
        this.mostrarSereno();
      },
      (error)=>{
        console.log(error);

      }
    )
  }
  borraralerta(id:number){
    Swal.fire({
      title: 'Estas seguro?',
      text: "Esta alerta sera eliminada!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.alertaDerivadaService.deleteAlerta(id).subscribe(
          (resp)=>{
            this.ws.emit('borrar-alerta-derivada');
            Swal.fire(
              'Eliminado!',
              'Se elimino la alerta derivada con exito.',
              'success'
            );
            this.mostrarAlerta();
          }
        )
      }
    })
  }
  ShowSelected($event: any) {
    if ($event.target.value === '0') {
      this.tipo = '0';
      this.mostrarAlerta();
    }
    if ($event.target.value === '1') {
      this.tipo = '1';
      this.mostrarAlerta();
    }
  }
  obtenerDatos(id:number){
    this.codigoAlerta = id;
    this.alertaDerivadaService.getAlertaDerivada(this.codigoAlerta).subscribe(
      ({alertaDerivada}:ResultAlertaDerivada)=>{
        this.serenoForm.setValue({
          sereno:alertaDerivada.id_usuario
        })
      }
    )
  }
  cancelar(){
    this.codigoAlerta = 0;
    this.serenoForm.setValue({
      sereno:''
    })
  }
}
