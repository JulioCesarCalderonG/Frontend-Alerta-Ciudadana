import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AdminGuard } from '../guard/admin.guard';
import { CentroCiudadanoComponent } from './centro-ciudadano/centro-ciudadano.component';
import { TipoAtencionComponent } from './tipo-atencion/tipo-atencion.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CiudadanoComponent } from './ciudadano/ciudadano.component';
import { AlertasComponent } from './alertas/alertas.component';
import { AlertaDerivadaComponent } from './alerta-derivada/alerta-derivada.component';
import { TipoAlertaComponent } from './tipo-alerta/tipo-alerta.component';
import { ControlPersonalComponent } from './control-personal/control-personal.component';


const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'usuario', component: UsuarioComponent },
            { path: 'ciudadano', component: CiudadanoComponent },
            { path: 'alerta', component: AlertasComponent },
            { path: 'tipo-alerta', component: TipoAlertaComponent },
            { path: 'alerta-derivada', component: AlertaDerivadaComponent },
            { path: 'tipo-atencion', component: TipoAtencionComponent },
            { path: 'centro-atencion', component: CentroCiudadanoComponent },
            { path: 'progress', component: ProgressComponent },
            { path: 'ultimas-24-horas', component: Grafica1Component },
            { path: 'control-personal', component: ControlPersonalComponent },
        ],
        canActivateChild: [
            AdminGuard
        ]
    },

    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
