import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule} from '@angular/router'

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { CentroCiudadanoComponent } from './centro-ciudadano/centro-ciudadano.component';
import { TipoAtencionComponent } from './tipo-atencion/tipo-atencion.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { UsuarioComponent } from './usuario/usuario.component';
import { CiudadanoComponent } from './ciudadano/ciudadano.component';
import { AlertasComponent } from './alertas/alertas.component';
import { AlertaDerivadaComponent } from './alerta-derivada/alerta-derivada.component';
import { TipoAlertaComponent } from './tipo-alerta/tipo-alerta.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts';
import { ControlPersonalComponent } from './control-personal/control-personal.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { AlertaSpamComponent } from './alerta-spam/alerta-spam.component';
import { ReporteCiudaanoComponent } from './reporte-ciudaano/reporte-ciudaano.component';
import { ReporteControlSistemaComponent } from './reporte-control-sistema/reporte-control-sistema.component';
import { ReporteTipoAlertaComponent } from './reporte-tipo-alerta/reporte-tipo-alerta.component';
import { ReporteAlertasDerivadasComponent } from './reporte-alertas-derivadas/reporte-alertas-derivadas.component';
import { PostVehiculoComponent } from './post-vehiculo/post-vehiculo.component';
import { SpamComponent } from './spam/spam.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    AdminComponent,
    CentroCiudadanoComponent,
    TipoAtencionComponent,
    UsuarioComponent,
    CiudadanoComponent,
    AlertasComponent,
    AlertaDerivadaComponent,
    TipoAlertaComponent,
    ControlPersonalComponent,
    VehiculosComponent,
    AlertaSpamComponent,
    ReporteCiudaanoComponent,
    ReporteControlSistemaComponent,
    ReporteTipoAlertaComponent,
    ReporteAlertasDerivadasComponent,
    PostVehiculoComponent,
    SpamComponent
  ],
  exports:[
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    AdminComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    ChartsModule
  ]
})
export class AdminModule { }
