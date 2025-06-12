import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResultUsuarios, Usuario } from 'src/app/interface/usuario';
import { AlertaService } from 'src/app/services/alerta.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertaDerivadaService } from '../../services/alerta-derivada.service';
import Swal from 'sweetalert2';
import { WebsocketService } from 'src/app/socket/websocket.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';
import { TipoAlertaService } from 'src/app/services/tipo-alerta.service';
import { ResultTipoAlertas, Tipoalerta } from 'src/app/interface/tipo-alerta';
import { AlertaGeneradaService } from 'src/app/services/alerta-generada.service';
import { MinimizarService } from 'src/app/services/minimizar.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
   
  private debounceTimer?: NodeJS.Timeout;
  public isCargaDatos: boolean = false;
  public listUsuario: Usuario[] = [];
  urlBackend=environment.backendURL;
  codigoAlerta: number = 0;
  buscar = '';
  serenoForm: FormGroup;
  alertaForm:FormGroup;
  detalleAlerta={
    ciudadano:'',
    fecha:'',
    hora:'',
    celular:'',
    correo:''
  }
  listTipoAlerta?:Tipoalerta[];
  idAlerta?:number;
  minimizar?:boolean;
  constructor(
    private alertaService: AlertaService,
    private usuarioService: UsuarioService,
    private tipoAlertaService:TipoAlertaService,
    private alertaGeneradaService:AlertaGeneradaService,
    private alertaDerivada: AlertaDerivadaService,
    private fb: FormBuilder,
    private ws: WebsocketService,
    private toastr: ToastrService,
    private minimizarService:MinimizarService
  ) {
    this.serenoForm = this.fb.group({
      sereno: ['', Validators.required],
    });
    this.alertaForm = this.fb.group({
      descripcion:['',Validators.required],
      tipo_alerta:['',Validators.required]
    });
    this.minimizarService.minimizarCurrent.subscribe((event)=>{
      this.minimizar=event;
            
    })
  }

  ngOnInit(): void {
    this.mostrarAlerta();
    this.mostrarSereno();
    this.mostrarAlertaSocket();
    this.mostrarTipoAlerta();
    this.wsSerenazgoLogin();
    this.wsSerenazgoLogout();
  }
  onQueryChanged(query: string = '') {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.buscar = query;
      this.mostrarAlerta();
    }, 350);
  }
  mostrarAlerta() {
    this.alertaService.getFiltroAlerta(this.buscar);
  }
  clickEvent(event: number) {
    this.codigoAlerta = event;
  }
  clickId(event:number){
    this.alertaService.getAlertaId(event).subscribe(
      (data:any)=>{
        this.detalleAlerta={
          celular:data.alerta.celular,
          ciudadano:`${data.alerta.ciudadano}`,
          correo:data.alerta.correo,
          fecha:data.alerta.fecha,
          hora:data.alerta.hora
        }
      },(error)=>{
        console.log(error);

      }
    )
  }
  mostrarSereno() {
    this.usuarioService.getSerenazgo().subscribe((resp: ResultUsuarios) => {
      this.listUsuario = resp.usuario;
    });
  }
  derivarAlerta() {
    console.log(this.serenoForm.get('sereno')?.value);
    const formData = new FormData();
    formData.append('id_alerta', String(this.codigoAlerta));
    formData.append('id_usuario', this.serenoForm.get('sereno')?.value);
    this.alertaDerivada.postAlertaDerivada(formData).subscribe(
      (resp) => {
        Swal.fire(
          'Derivado!',
          'La alerta ha sido derivado con exito, verifica en alertas derivadas!',
          'success'
        );
        this.ws.emit(`alerta-derivada`, {
          titulo: 'Alerta Nueva',
          msg: 'Porfavor verifica su ubicacion y acerquese al lugar',
          usuario: `${this.serenoForm.get('sereno')?.value}`,
        },(data:any)=>{
          console.log(data);
        });
      },
      (error) => {
        console.log(error);
        
        Swal.fire('Ya derivado!', error.error.errors[0].msg, 'error');
      }
    );
  }
  registrarAlerta(){
    const formData = new FormData();
    formData.append('descripcion',this.alertaForm.get('descripcion')?.value);
    formData.append('id_tipo_alerta',this.alertaForm.get('tipo_alerta')?.value);
    formData.append('id_alerta',`${this.idAlerta}`);
    this.alertaGeneradaService.postAlertaGenerada(formData).subscribe(
      (data)=>{
        console.log(data);
        Swal.fire(
          'Registrado!',
          'La alerta ha sido registrado con exito',
          'success'
        );
        this.ws.emit('registrar-alerta-generada');
      },(error)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: error.error.errors[0].msg,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )

  }
  codigoRegistro(event:any){
    console.log(event);
    this.idAlerta = event
  }

  cancelar() {
    this.codigoAlerta = 0;
    this.serenoForm.setValue({
      sereno: '',
    });
    this.alertaForm.setValue({
      descripcion:'',
      tipo_alerta:''
    })
  }
  mostrarAlertaSocket() {
    this.ws.listen('actualizar-alerta-general').subscribe(
      (data) => {
        this.mostrarAlerta();
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
  mostrarTipoAlerta(){
    this.tipoAlertaService.getTipoAlertas("1").subscribe(
      (data:ResultTipoAlertas)=>{
        this.listTipoAlerta = data.tipoalerta;

      },
      (error)=>{
        console.log(error);
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
  codigoAtendido(event:number){
    console.log(event);
    Swal.fire({
      title: 'Estas seguro?',
      text: "la alerta se marcara como atendido!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, atender!',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.alertaService.putAtenderAlerta(event).subscribe(
          (data) => {
            this.mostrarAlerta();
            Swal.fire({
              title: 'Atendido!',
              text: data.msg,
              icon: 'success',
            });
          },
          (error) => {
            console.log(error);
          }
        );
        
      }
    });
  }
  codigoSpam(event:any){
    console.log(event);
    Swal.fire({
      title: 'Estas seguro?',
      text: (event.spam===1)?"la alerta se desmarcara como spam!":"la alerta se marcara como spam!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: (event.spam===1)?'Si, desmarcar!':'Si, marcar!',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.alertaService.putSpamAlerta(event.id, {spam:event.spam}).subscribe(
          (data) => {
            this.mostrarAlerta();
            Swal.fire({
              title: 'Spam!',
              text: data.msg,
              icon: 'success',
            });
          },
          (error) => {
            console.log(error);
          }
        );
        
      }
    });
  }
}
