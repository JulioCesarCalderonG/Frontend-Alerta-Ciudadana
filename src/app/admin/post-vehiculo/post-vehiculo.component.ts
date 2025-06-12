import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResultVehiculo, VehiculoPost } from 'src/app/interface/vehiculo';
import { VehiculosService } from 'src/app/services/vehiculos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-vehiculo',
  templateUrl: './post-vehiculo.component.html',
  styleUrls: ['./post-vehiculo.component.css'],
})
export class PostVehiculoComponent implements OnInit {
  estado: string = '1';
  listVehiculo: VehiculoPost[] = [];
  p: number = 1;
  vehiculoForm: FormGroup;
  vehiculoEditForm: FormGroup;
  ids: number = 0;
  constructor(
    private vehiServ: VehiculosService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.vehiculoForm = this.fb.group({
      nombre: ['', Validators.required],
    });
    this.vehiculoEditForm = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.mostrarVehiculo();
  }

  mostrarVehiculo() {
    this.vehiServ.mostrarVehiculosPost(this.estado).subscribe({
      next: (data: ResultVehiculo) => {
        console.log(data);
        this.listVehiculo = data.vehiculo;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  agregarVehiculo() {
    const formData = new FormData();
    formData.append('nombre', this.vehiculoForm.get('nombre')?.value);
    this.vehiServ.guardarVehiculosPost(formData).subscribe({
      next: (data: any) => {
        if (!data.ok) {
          this.toastr.warning(data.msg, 'Error');
        }
        if (data.ok) {
          this.toastr.success(data.msg, 'Mensaje');
          this.vehiculoForm.setValue({
            nombre: '',
          });
          this.mostrarVehiculo();
        }
      },

      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.errors[0].msg, 'Error');
      },
    });
  }
actualizarVehiculo() {
    const formData = new FormData();
    formData.append('nombre', this.vehiculoEditForm.get('nombre')?.value);
    this.vehiServ.editarVehiculosPost(formData, this.ids).subscribe({
      next: (data: any) => {
        if (!data.ok) {
          this.toastr.warning(data.msg, 'Error');
        }
        if (data.ok) {
          this.toastr.success(data.msg, 'Mensaje');
          this.vehiculoForm.setValue({
            nombre: '',
          });
          this.mostrarVehiculo();
        }
      },

      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.errors[0].msg, 'Error');
      },
    });
  }
  borrarvehiculo(id: number, estado: string) {
    Swal.fire({
        title: 'Estas seguro?',
        text:
          estado === '1'
            ? 'El vehiculo sera borrado!!!'
            : 'El vehiculo sera borrado!!!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: estado === '1' ? 'Cancelar' : 'Si, Borrar!',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.vehiServ.deleteVehiculosPost(id, estado).subscribe(
            (data) => {
              Swal.fire(
                estado === '1' ? 'Borrado' : 'Borrado',
                data.msg,
                'success'
              );
              
              this.mostrarVehiculo();
            },
            (error) => {
              console.log(error);
            }
          );
        }
      });
  }
  obtenerDatos(vehiculo: VehiculoPost) {
    this.ids=vehiculo.id;
    this.vehiculoEditForm.setValue({
      nombre: vehiculo.nombre,
    });
  }
  cancelar() {
    this.vehiculoForm.setValue({
      nombre: '',
    });
    this.vehiculoEditForm.setValue({
      nombre: '',
    });
  }
  ShowSelected($event: any) {
    if ($event.target.value === '1') {
      this.estado = '1';
      this.mostrarVehiculo();
    }
    if ($event.target.value === '2') {
      this.estado = '0';
      this.mostrarVehiculo();
    }
  }
}
