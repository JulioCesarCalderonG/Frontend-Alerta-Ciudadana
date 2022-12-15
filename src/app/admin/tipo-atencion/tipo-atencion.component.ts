import { Component, OnInit } from '@angular/core';
import { ResultTipoAtencion, ResultTipoAtenciones, TipoAtencion } from 'src/app/interface/tipo.atencion';
import { TipoAtencionService } from 'src/app/services/tipo-atencion.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tipo-atencion',
  templateUrl: './tipo-atencion.component.html',
  styleUrls: ['./tipo-atencion.component.css']
})
export class TipoAtencionComponent implements OnInit {


  listTipoAtencion?: Array<TipoAtencion>;
  estado: string = '1';
  loadImage: string = `${environment.backendURL}/uploadgeneral/tipo-atencion`;
  ids?:number;
  titulo='Agregar Tipo de Atencion';
  tipoAtencionForm: FormGroup;
  constructor(private tipoAtencionService: TipoAtencionService, private fb:FormBuilder) { 
    this.tipoAtencionForm = this.fb.group({
      nombre:['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.mostrarTipoAtencion();
  }
  mostrarTipoAtencion() {
    this.tipoAtencionService.getTiposAtencion(this.estado).subscribe(
      (data: ResultTipoAtenciones) => {
        this.listTipoAtencion = data.tipoAtencion;
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
          (data)=>{
            Swal.fire(
              (estado==='1') ? 'Desbloqueado' : 'Bloqueado',
              data.msg,
              'success'
            );
            this.mostrarTipoAtencion();
          },
          (error)=>{
            console.log(error);
          }
        )
      }
    });
  }
  obtenerDatos(id:any){
    this.titulo = 'Editar Tipo de Atencion'
    this.tipoAtencionService.getTipoAtencion(id).subscribe(
      (data:ResultTipoAtencion)=>{
        this.tipoAtencionForm.setValue({
          nombre:data.tipoAtencion.nombre
        });
        this.ids = data.tipoAtencion.id;
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
  agregarEditarTipoAtencion(){
    if (!this.ids) {
      console.log('estas agregando');
      
    }
    if (this.ids) {
      console.log('estas editando');
      
    }
  }
  cancelar(){
    this.titulo = 'Agregar Tipo de Atencion'
    this.tipoAtencionForm.setValue({
      nombre:''
    });
    this.ids = undefined;
  }
}
