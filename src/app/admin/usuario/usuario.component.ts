import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { UsuarioForm } from 'src/app/interface/usuario-form';
import { Usuario, ResultUsuario } from 'src/app/interface/usuario';
import { SunatService } from 'src/app/services/sunat.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { loadData } from 'src/app/alerts/load';
import { closeAlert } from 'src/app/alerts/close';
import { ValidarSunat } from 'src/app/interface/validar.sunat';
import { CargoService } from 'src/app/services/cargo.service';
import { Cargo, ResultCargo } from 'src/app/interface/cargo';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarioForm: UsuarioForm = {
    dni: '',
    nombre: '',
    apellido: '',
    cargo: '',
    password: ''
  }
  listUsuario?: Array<Usuario>;
  listCargo?:Array<Cargo>
  estado: string = '1';
  titulo = 'Agregar Usuario';
  ids?: number;
  cargar = true;
  @ViewChild('dniInput', { static: false }) dniTip?: ElementRef;
  constructor(private usuarioService: UsuarioService, private sunatService: SunatService, private cargoService:CargoService, private toastr:ToastrService, private rederer2:Renderer2) { }

  ngOnInit(): void {
    this.mostrarUsuario();
    this.mostrarCargos();
  }

  validarSunat() {
    if (this.cargar) {
      loadData('Cargando....', 'Por favor espere, se estan validando los datos');
    }
    const formData = new FormData();
    formData.append('dni', this.usuarioForm?.dni);
    console.log(this.usuarioForm);

    this.sunatService.postSunat(formData).subscribe(
      (data:ValidarSunat) => {
        console.log(data);
        this.toastr.success('DNI valido', 'Mensaje');
        this.usuarioForm.dni = data.datos.dni;
        this.usuarioForm.nombre=data.datos.nombre;
        this.usuarioForm.apellido=data.datos.apellido;
        const dniTipo = this.dniTip?.nativeElement;
        this.rederer2.setAttribute(dniTipo,'disabled', 'true');
        this.cargar = false;
        if (!this.cargar) {
          closeAlert();
        }
        this.cargar = true;
      },
      (error) => {
        console.log(error);
        this.toastr.warning('Error de DNI', 'Mensaje');
        this.cargar = false;
        if (!this.cargar) {
          closeAlert();
        }
        this.cargar = true;
      }
    )
  }
  mostrarCargos(){
    this.cargoService.getCargos().subscribe(
      (data:ResultCargo)=>{
        console.log(data);
        this.listCargo =data.cargo;
      },(error)=>{
        console.log(error);
        
      }

    )
  }
  mostrarUsuario() {
    this.usuarioService.getUsuarios(this.estado).subscribe(
      (data: ResultUsuario) => {
        this.listUsuario = data.usuario;
      },
      (error) => {
        console.log(error);

      }
    )
  }
  obtenerDatos(id: any) {
    this.titulo = "Editar Usuario";
  }
  borrarusuario(id: any, estado: string) {

  }
  ShowSelected($event: any) {
    if ($event.target.value === '1') {
      this.estado = '1';
      this.mostrarUsuario();
    }
    if ($event.target.value === '2') {
      this.estado = '0';
      this.mostrarUsuario();
    }
  }
  cancelar() {
    const dniTipo = this.dniTip?.nativeElement;
    this.rederer2.removeAttribute(dniTipo,'disabled');
    this.titulo = 'Agregar Usuario'
    this.ids = undefined;
    this.usuarioForm = {
      dni: '',
      nombre: '',
      apellido: '',
      cargo: '',
      password: ''
    }
  }
}
