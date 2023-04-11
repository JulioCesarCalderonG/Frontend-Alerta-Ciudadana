import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ResultTipoAtencion, ResultTipoAtenciones, TipoAtencion } from 'src/app/interface/tipo.atencion';
import { TipoAtencionService } from 'src/app/services/tipo-atencion.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tipo-atencion',
  templateUrl: './tipo-atencion.component.html',
  styleUrls: ['./tipo-atencion.component.css']
})
export class TipoAtencionComponent implements OnInit {


  listTipoAtencion?: Array<TipoAtencion>;
  estado: string = '1';
  priImage: string = `${environment.backendURL}/uploadgeneral/tipo-atencion`;
  loadImage?: string;
  ids?: number;
  titulo = 'Agregar Tipo de Atencion';
  tipoAtencionForm: FormGroup;
  uploadFiles?: File;
  p: number = 1;
  @ViewChild('fileInput', { static: false }) fileInput?: ElementRef;
  @ViewChild('asTable', { static: false }) tableTip?: ElementRef;
  constructor(private tipoAtencionService: TipoAtencionService, private fb: FormBuilder, private sanitizer: DomSanitizer, private toastr: ToastrService, private renderer2: Renderer2) {
    this.tipoAtencionForm = this.fb.group({
      nombre: ['', Validators.required],
      img: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.mostrarTipoAtencion();
  }
  mostrarTipoAtencion() {
    this.tipoAtencionService.getTiposAtencion(this.estado).subscribe(
      (data: ResultTipoAtenciones) => {
        this.listTipoAtencion = data.tipoAtencion;
        for (let i = 0; i < this.listTipoAtencion.length; i++) {
          this.listTipoAtencion[i].img = `${this.priImage}/${(this.listTipoAtencion[i].img)?this.listTipoAtencion[i].img:'asaaaaa'}/${this.listTipoAtencion[i].id}`
        }


      },
      (error) => {
        console.log(error);

      }
    )
  }
  ShowSelected($event: any) {
    if ($event.target.value === '1') {
      this.estado = '1';
      this.mostrarTipoAtencion();
    }
    if ($event.target.value === '2') {
      this.estado = '0';
      this.mostrarTipoAtencion();
    }
  }

  borrarTipoAtencion(id: any, estado: any) {
    Swal.fire({
      title: 'Estas seguro?',
      text: (estado === '1') ? 'Esta tipo de atencion sera desbloqueado!!!' : 'Esta tipo de atencion sera bloqueado!!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: (estado === '1') ? 'Si, desbloquear!' : 'Si, bloquear!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipoAtencionService.deleteTipoAtencion(id, estado).subscribe(
          (data) => {
            Swal.fire(
              (estado === '1') ? 'Desbloqueado' : 'Bloqueado',
              data.msg,
              'success'
            );
            this.mostrarTipoAtencion();
          },
          (error) => {
            console.log(error);
          }
        )
      }
    });
  }
  obtenerDatos(id: any) {
    this.titulo = 'Editar Tipo de Atencion'
    this.tipoAtencionService.getTipoAtencion(id).subscribe(
      (data: ResultTipoAtencion) => {
        this.tipoAtencionForm.setValue({
          nombre: data.tipoAtencion.nombre,
          img: data.tipoAtencion.img
        });
        this.ids = data.tipoAtencion.id;
        this.loadImage = `${environment.backendURL}/uploadgeneral/tipo-atencion/${data.tipoAtencion.id}`
      },
      (error) => {
        console.log(error);

      }
    )
  }
  agregarEditarTipoAtencion() {
    if (!this.ids) {
      const formData = new FormData();
      formData.append('nombre', this.tipoAtencionForm.get('nombre')?.value);
      formData.append('archivo', this.fileInput!.nativeElement.files[0]);
      this.tipoAtencionService.postTipoAtencion(formData).subscribe(
        (data) => {
          this.toastr.success('Tipo de atencio creado con exito','Mensaje');
          this.mostrarTipoAtencion();
        },
        (error) => {
          console.log(error);
        }
      )

    }
    if (this.ids) {
      const formData = new FormData();
      formData.append('nombre', this.tipoAtencionForm.get('nombre')?.value);
      this.tipoAtencionService.putTipoAtencion(formData, this.ids).subscribe(
        (data) => {
          this.toastr.success('Datos actualizados con exito','Mensaje');
          this.mostrarTipoAtencion();
        },
        (error) => {
          console.log(error);
        }
      )

    }
  }
  capturarFile(event: any) {
    this.uploadFiles = event.target.files[0];
    if (this.uploadFiles!.size > 1072383) {
      this.toastr.warning('El tamaño maximo es de 1 MB', 'ARCHIVO EXCEDE LO ESTIMADO');
      this.reset();
    }
    else {
      this.extraserBase64(this.uploadFiles).then((imagen: any) => {
        this.loadImage = imagen.base;
        this.tipoAtencionForm.setValue({
          nombre: '',
          img: this.loadImage
        })
        if (this.ids !== undefined) {
          const formData = new FormData();
          formData.append('archivo', this.fileInput!.nativeElement.files[0]);
          this.tipoAtencionService.putImagenTipoAtencion(this.ids, formData).subscribe(
            (data) => {
              this.toastr.success('Imagen Actualizada con exito','Mensaje');
              this.mostrarTipoAtencion();
            },
            (error) => {
              console.log(error);
            }
          )
        }
      });
    }

  }
  reset() {
    this.fileInput!.nativeElement.value = "";
  }
  extraserBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      /* const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg); */
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        })
      };
      reader.onerror = error => {
        resolve({
          base: null
        })
      }
    } catch (e) {
      reject(e)
    }
  })
  cancelar() {
    this.titulo = 'Agregar Tipo de Atencion'
    this.tipoAtencionForm.setValue({
      nombre: '',
      img: ''
    });
    this.ids = undefined;
    this.loadImage = undefined;
  }
}
