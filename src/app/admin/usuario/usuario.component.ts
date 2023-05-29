import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { UsuarioForm } from 'src/app/interface/usuario-form';
import {
  Usuario,
  ResultUsuarios,
  ResultUsuario,
} from 'src/app/interface/usuario';
import { SunatService } from 'src/app/services/sunat.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { loadData } from 'src/app/alerts/load';
import { closeAlert } from 'src/app/alerts/close';
import { ValidarSunat } from 'src/app/interface/validar.sunat';
import { CargoService } from 'src/app/services/cargo.service';
import { Cargo, ResultCargo } from 'src/app/interface/cargo';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  usuarioForm: UsuarioForm = {
    dni: '',
    nombre: '',
    apellido: '',
    cargo: '',
    password: '',
  };
  listUsuario?: Array<Usuario>;
  listCargo?: Array<Cargo>;
  estado: string = '1';
  titulo = 'Agregar Usuario';
  ids?: number;
  cargar = true;
  p: number = 1;
  @ViewChild('dniInput', { static: false }) dniTip?: ElementRef;
  constructor(
    private usuarioService: UsuarioService,
    private sunatService: SunatService,
    private cargoService: CargoService,
    private toastr: ToastrService,
    private rederer2: Renderer2
  ) {}

  ngOnInit(): void {
    this.mostrarUsuario();
    this.mostrarCargos();
  }

  validarSunat() {
    if (this.cargar) {
      loadData(
        'Cargando....',
        'Por favor espere, se estan validando los datos'
      );
    }
    const formData = new FormData();
    formData.append('dni', this.usuarioForm?.dni);
    console.log(this.usuarioForm);

    this.sunatService.postSunat(formData).subscribe(
      (data: ValidarSunat) => {

        if (!data.ok) {
          this.toastr.warning(data.msg, 'Mensaje');
          this.cargar = false;
          if (!this.cargar) {
            closeAlert();
          }
          this.cargar = true;
          return;
        }
        this.toastr.success('DNI valido', 'Mensaje');
        this.usuarioForm.dni = String(data.datos.dni);
        this.usuarioForm.nombre = data.datos.nombre;
        this.usuarioForm.apellido = data.datos.apellido;
        const dniTipo = this.dniTip?.nativeElement;
        this.rederer2.setAttribute(dniTipo, 'disabled', 'true');
        this.cargar = false;
        if (!this.cargar) {
          closeAlert();
        }

        this.cargar = true;
        return;
      },
      (error) => {
        this.toastr.warning('Error de DNI', 'Mensaje');
        this.cargar = false;
        if (!this.cargar) {
          closeAlert();
        }
        this.cargar = true;
      }
    );
  }
  mostrarCargos() {
    this.cargoService.getCargos().subscribe(
      (data: ResultCargo) => {
        this.listCargo = data.cargo;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  mostrarUsuario() {
    this.usuarioService.getUsuarios(this.estado).subscribe(
      (data: ResultUsuarios) => {
        this.listUsuario = data.usuario;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  obtenerDatos(id: any) {
    this.titulo = 'Editar Usuario';
    this.usuarioService.getUsuario(id).subscribe(
      ({ usuario }: ResultUsuario) => {
        const dniTipo = this.dniTip?.nativeElement;
        this.rederer2.setAttribute(dniTipo, 'disabled', 'true');
        this.usuarioForm = {
          apellido: usuario.apellido,
          nombre: usuario.nombre,
          cargo: `${usuario.id_cargo}`,
          dni: usuario.dni,
          password: '',
        };
        this.ids = usuario.id;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  agregarEditarUsuario() {
    if (!this.ids) {
      if (this.usuarioForm.password.length === 0) {
        this.toastr.warning('Se requiere un password', 'Mensaje');
      } else {
        const formData = new FormData();
        formData.append('dni', this.usuarioForm.dni);
        formData.append('nombre', this.usuarioForm.nombre);
        formData.append('id_cargo', this.usuarioForm.cargo);
        formData.append('apellido', this.usuarioForm.apellido);
        formData.append('password', this.usuarioForm.password);
        this.usuarioService.postUsuario(formData).subscribe(
          (data: any) => {
            if (!data.ok) {
              this.toastr.warning(data.msg, 'Error');
            }
            if (data.ok) {
              this.toastr.success(data.msg, 'Mensaje');
              this.usuarioForm = {
                dni: '',
                nombre: '',
                apellido: '',
                cargo: '',
                password: '',
              };
              const dniTipo = this.dniTip?.nativeElement;
              this.rederer2.removeAttribute(dniTipo, 'disabled');
              this.mostrarUsuario();
            }
          },
          (error) => {
            console.log(error.error.errors[0]);
            this.toastr.error(error.error.errors[0].msg, 'Error');
          }
        );
      }
    }
    if (this.ids) {
      const formData = new FormData();
      formData.append('dni', this.usuarioForm.dni);
      formData.append('nombre', this.usuarioForm.nombre);
      formData.append('id_cargo', this.usuarioForm.cargo);
      formData.append('apellido', this.usuarioForm.apellido);
      if (this.usuarioForm.password.length >= 1) {
        formData.append('password', this.usuarioForm.password);
      }
      this.usuarioService.putUsuario(formData, this.ids).subscribe(
        (data: any) => {
          if (!data.ok) {
            this.toastr.warning(data.msg, 'Error');
          }
          if (data.ok) {
            this.toastr.success(data.msg, 'Mensaje');
            this.usuarioForm.password = '';
            this.mostrarUsuario();
          }
        },
        (error) => {
          this.toastr.error(error.error.errors[0].msg, 'Error');
        }
      );
    }
  }
  borrarusuario(id: any, estado: string) {
    Swal.fire({
      title: 'Estas seguro?',
      text:
        estado === '1'
          ? 'Esta tipo de atencion sera desbloqueado!!!'
          : 'Esta tipo de atencion sera bloqueado!!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: estado === '1' ? 'Si, desbloquear!' : 'Si, bloquear!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteUsuario(id, estado).subscribe(
          (data) => {
            Swal.fire(
              estado === '1' ? 'Desbloqueado' : 'Bloqueado',
              data.msg,
              'success'
            );
            this.usuarioForm = {
              dni: '',
              nombre: '',
              apellido: '',
              cargo: '',
              password: '',
            };
            this.mostrarUsuario();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
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
    this.rederer2.removeAttribute(dniTipo, 'disabled');
    this.titulo = 'Agregar Usuario';
    this.ids = undefined;
    this.usuarioForm = {
      dni: '',
      nombre: '',
      apellido: '',
      cargo: '',
      password: '',
    };
  }
}
