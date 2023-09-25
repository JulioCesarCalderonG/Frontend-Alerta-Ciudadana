import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { closeAlert, loadData } from 'src/app/alerts/load';
import { GenerarCodigoService } from 'src/app/services/generar-codigo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eliminar-cuenta',
  templateUrl: './eliminar-cuenta.component.html',
  styleUrls: ['./eliminar-cuenta.component.css']
})
export class EliminarCuentaComponent implements OnInit {

  codigoForm:FormGroup;
  carga:boolean=false;
  constructor(
    private fb:FormBuilder,
    private codigoService:GenerarCodigoService,
    private router:Router,
    private toastr:ToastrService
  ) {
    const codigo = sessionStorage.getItem('codigo');
    if (!codigo) {
      router.navigate(['**'])
    }
    this.codigoForm=this.fb.group({
      codigo:['',Validators.required]
    })
  }

  ngOnInit(): void {
  }

  eliminarCuenta(){
    this.carga=true;
    if (this.carga) {
      loadData('Cargando Datos!!','Se estan validando el codigo ingresado, porfavor espere')
    }
    const codigo = this.codigoForm.get('codigo')?.value;
    const codigoAsyn= sessionStorage.getItem('codigo');
    const id= sessionStorage.getItem('id_ciudadano');
    if (codigo!==codigoAsyn) {
     this.toastr.error('El codigo ingresado no es valido, verifica porfavor','Codigo Invalido')
    }else{
      this.codigoService.eliminarCuenta(id!).subscribe(
        (data)=>{
          this.carga=false;
          if (!this.carga) {
            closeAlert();
          }
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: data.msg,
            showConfirmButton: false,
            timer: 1500
          });
          sessionStorage.removeItem('id_ciudadano');
          sessionStorage.removeItem('codigo');
          this.router.navigate(['/eliminar-cuenta/exitoso']);
        },
        error=>{
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



}
