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
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { UsuarioComponent } from './usuario/usuario.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    AdminComponent,
    CentroCiudadanoComponent,
    TipoAtencionComponent,
    UsuarioComponent
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
    ToastrModule.forRoot(),
  ]
})
export class AdminModule { }
