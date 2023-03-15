import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import {
  OpcionFoto,
  ResultOpcionFoto,
  ResultOpcionFotos,
} from 'src/app/interface/opcion-foto';
import {
  ResultTipoAlerta,
  ResultTipoAlertas,
  Tipoalerta,
} from 'src/app/interface/tipo-alerta';
import { OpcionFotoService } from 'src/app/services/opcion-foto.service';
import { TipoAlertaService } from 'src/app/services/tipo-alerta.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

interface TipoAlertaForm {
  nombre: string;
  opcionFoto: string;
  imagenDefault: string
}

@Component({
  selector: 'app-tipo-alerta',
  templateUrl: './tipo-alerta.component.html',
  styleUrls: ['./tipo-alerta.component.css'],
})
export class TipoAlertaComponent implements OnInit {
  estado: string = '1';
  listTipoAlerta?: Array<Tipoalerta>;
  listOpcionFoto?: Array<OpcionFoto>;
  titulo = 'Crear Tipo de Alerta';
  loadImage?: string;
  ids?: string;
  tipoAlertaForm: TipoAlertaForm = {
    nombre: '',
    opcionFoto: '',
    imagenDefault: ''
  };
  @ViewChild('fileInput', { static: false }) fileInput?: ElementRef;
  uploadFiles?: File;
  constructor(
    private tipoAlertaService: TipoAlertaService,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
    private opcionFotoService: OpcionFotoService
  ) { }

  ngOnInit(): void {
    this.mostrarTipoAlertas();
    this.mostrarOpcionFoto();
  }
  mostrarTipoAlertas() {
    this.tipoAlertaService.getTipoAlertas(this.estado).subscribe(
      (data: ResultTipoAlertas) => {
        this.listTipoAlerta = data.tipoalerta;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  mostrarOpcionFoto() {
    this.opcionFotoService.getOpcionFotos().subscribe(
      (data: ResultOpcionFotos) => {
        this.listOpcionFoto = data.opcionFoto;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  agregarEditarTipoAtencion() {
    if (this.tipoAlertaForm.nombre !== '' && this.tipoAlertaForm.opcionFoto !== '' && this.tipoAlertaForm.imagenDefault !== '') {
      if (this.ids === undefined) {
        const formData = new FormData();
        formData.append('nombre', this.tipoAlertaForm.nombre);
        formData.append('opcion', this.tipoAlertaForm.opcionFoto);
        formData.append('archivo', this.fileInput!.nativeElement.files[0]);
        this.tipoAlertaService.postTipoAlerta(formData).subscribe(
          (data) => {
            this.mostrarTipoAlertas();
            this.toastr.success('Se guardo el tipo de alerta con exito', 'Mensaje')
            this.tipoAlertaForm = {
              nombre: '',
              opcionFoto: '',
              imagenDefault: ''
            }
          },
          (error) => {
            console.log(error);
          }
        )
      } else {
        const formData = new FormData();
        formData.append('nombre', this.tipoAlertaForm.nombre);
        formData.append('opcion', this.tipoAlertaForm.opcionFoto);
        this.tipoAlertaService.putTipoAlerta(formData, this.ids).subscribe(
          (data) => {
            this.mostrarTipoAlertas();
            this.toastr.success('Se actualizo el tipo de alerta con exito', 'Mensaje')
          },
          (error) => {
            console.log(error);
          }
        )
      }
    } else {
      this.toastr.warning('Porfavor ingresa los datos completos', 'Warning')
    }
  }
  obtenerDatos(id: number) {
    this.titulo = 'Editar Tipo de Atencion';
    this.tipoAlertaService.getTipoAlerta(id).subscribe(
      ({ tipoalerta }: ResultTipoAlerta) => {
        this.tipoAlertaForm = {
          nombre: tipoalerta.nombre,
          opcionFoto: `${tipoalerta.OpcionFoto.id}`,
          imagenDefault: 'cargado'
        };
        this.loadImage = `${environment.backendURL}/uploadgeneral/tipo-alerta/${tipoalerta.img}/${tipoalerta.id}`;
        this.ids = `${tipoalerta.id}`;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  borrartipoAlerta(id: any, estado: string) {
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
        this.tipoAlertaService.deleteTipoAlerta(id, estado).subscribe(
          (data) => {
            Swal.fire(
              estado === '1' ? 'Desbloqueado' : 'Bloqueado',
              data.msg,
              'success'
            );
            this.mostrarTipoAlertas();
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
      this.mostrarTipoAlertas();
    }
    if ($event.target.value === '2') {
      this.estado = '0';
      this.mostrarTipoAlertas();
    }
  }
  capturarFile(event: any) {
    this.uploadFiles = event.target.files[0];
    if (this.uploadFiles!.size > 1072383) {
      this.toastr.warning(
        'El tamaño maximo es de 1 MB',
        'ARCHIVO EXCEDE LO ESTIMADO'
      );
      this.reset();
    } else {
      this.extraserBase64(this.uploadFiles).then((imagen: any) => {
        this.loadImage = imagen.base;
        this.tipoAlertaForm.imagenDefault = 'cargado'
        if (this.ids !== undefined) {
          const formData = new FormData();
          formData.append('archivo', this.fileInput!.nativeElement.files[0]);
          this.tipoAlertaService.actualizarImage(formData, this.ids).subscribe(
            (data) => {
              this.toastr.success('Imagen Actualizada con exito', 'Mensaje');
              this.mostrarTipoAlertas();
              this.reset();
            },
            (error) => {
              console.log(error);
            }
          )
        }
      });
    }
  }

  extraserBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        /* const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg); */
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            base: null,
          });
        };
      } catch (e) {
        reject(e);
      }
    });
  reset() {
    this.fileInput!.nativeElement.value = '';
  }
  cancelar() {
    this.titulo = 'Agregar Tipo de Atencion';
    this.ids = undefined;
    this.loadImage = undefined;
    this.tipoAlertaForm = {
      nombre: '',
      opcionFoto: '',
      imagenDefault: ''
    };
  }
}
