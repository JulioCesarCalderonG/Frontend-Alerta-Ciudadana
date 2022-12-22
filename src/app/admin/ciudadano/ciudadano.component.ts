import { Component, OnInit } from '@angular/core';
import { Ciudadano, ResultCiudadano } from 'src/app/interface/ciudadano';
import { CiudadanoService } from 'src/app/services/ciudadano.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ciudadano',
  templateUrl: './ciudadano.component.html',
  styleUrls: ['./ciudadano.component.css']
})
export class CiudadanoComponent implements OnInit {

  listCiudadano?:Array<Ciudadano>;
  estado:string="1";
  inputBuscar:string="";
  constructor(private ciudadanoService:CiudadanoService) { }

  ngOnInit(): void {
    this.mostrarCiudadano();
  }
  mostrarCiudadano(){
    this.ciudadanoService.getCiudadanos(this.estado, this.inputBuscar).subscribe(
      (data:ResultCiudadano)=>{
        this.listCiudadano = data.ciudadano;
      },(error)=>{
        console.log(error);
        
      }
    )
  }
  buscar(valor:any){
    this.inputBuscar = valor;
    if (this.buscar.length>=1) {
      this.ciudadanoService.getCiudadanos(this.estado, this.inputBuscar).subscribe(
        (data:ResultCiudadano)=>{
          this.listCiudadano = data.ciudadano;
        },(error)=>{
          console.log(error);
          
        }
      )
    }
  }
  ShowSelected($event: any) {
    if ($event.target.value === '1') {
      this.estado = '1';
      this.mostrarCiudadano();
    }
    if ($event.target.value === '2') {
      this.estado = '0';
      this.mostrarCiudadano();
    }
  }
  borrarciudadano(id:any, estado:string){
    Swal.fire({
      title: 'Estas seguro?',
      text:
        estado === '1'
          ? 'El ciudadano sera desbloqueado!!!'
          : 'El ciudadano sera bloqueado!!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: estado === '1' ? 'Si, desbloquear!' : 'Si, bloquear!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ciudadanoService.deleteCiudadano(id,estado).subscribe(
          (data)=>{
            console.log(data);
            Swal.fire(
              estado === '1' ? 'Desbloqueado' : 'Bloqueado',
              data.msg,
              'success'
            );
            this.mostrarCiudadano();
          },
          (error)=>{
            console.log(error);
            
          }
        )
      }
    });
  }
}
