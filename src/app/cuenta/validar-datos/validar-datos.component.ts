import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { closeAlert, loadData } from 'src/app/alerts/load';
import { ResultGenerarCodigo } from 'src/app/interface/generar-codigo';
import { GenerarCodigoService } from 'src/app/services/generar-codigo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-validar-datos',
  templateUrl: './validar-datos.component.html',
  styleUrls: ['./validar-datos.component.css']
})
export class ValidarDatosComponent implements OnInit {

  codigoForm:FormGroup;
  carga:boolean=false;
  fecha=new Date().getFullYear();
  constructor(
    private fb:FormBuilder,
    private codigoService:GenerarCodigoService,
    private router:Router
  ) {
    this.codigoForm=this.fb.group({
      usuario:['',Validators.required],
      correo:['',Validators.required]
    })
  }

  ngOnInit(): void {
  }

  generarCodigo(){
    this.carga=true;
    if (this.carga) {
      loadData('Cargando Datos!!','Se estan validando los datos ingresados, porfavor espere')
    }
    const formData = new FormData();
    formData.append('usuario',this.codigoForm.get('usuario')?.value);
    formData.append('correo',this.codigoForm.get('correo')?.value);
    this.codigoService.postGenerarCodigo(formData).subscribe(
      (data:ResultGenerarCodigo)=>{
        sessionStorage.setItem('id_ciudadano',`${data.ciudadano.id}`);
        sessionStorage.setItem('codigo',data.codigo);
        this.carga=false;
        if (!this.carga) {
          closeAlert();
        }

        this.router.navigate(['/eliminar-cuenta/eliminar'])
      },
      (error)=>{
        this.carga=false;
        if (!this.carga) {
          closeAlert();
        }
        Swal.fire(
          'Error de validacion!',
          `${error.error.msg}!!!`,
          'error'
        )


      }
    )
  }

}
