import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuentaComponent } from './cuenta.component';
import { ValidarDatosComponent } from './validar-datos/validar-datos.component';
import { EliminarCuentaComponent } from './eliminar-cuenta/eliminar-cuenta.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts';
import { ExitosoComponent } from './exitoso/exitoso.component';



@NgModule({
  declarations: [
    CuentaComponent,
    ValidarDatosComponent,
    EliminarCuentaComponent,
    ExitosoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    ChartsModule
  ]
})
export class CuentaModule { }
