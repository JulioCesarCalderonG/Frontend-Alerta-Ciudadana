import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SerenazgoComponent } from './serenazgo.component';
import { AlertaDerivadaComponent } from './alerta-derivada/alerta-derivada.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    SerenazgoComponent,
    AlertaDerivadaComponent,
    DashboardComponent
  ],
  exports:[
    SerenazgoComponent,
    AlertaDerivadaComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    ChartsModule
  ],

})
export class SerenazgoModule { }
