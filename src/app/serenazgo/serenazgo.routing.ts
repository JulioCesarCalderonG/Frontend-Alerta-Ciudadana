import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SerenazgoComponent } from './serenazgo.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlertaDerivadaComponent } from './alerta-derivada/alerta-derivada.component';
import { SerenazgoGuard } from '../guard/serenazgo.guard';


const routes: Routes = [
  { path: 'serenazgo',
    component: SerenazgoComponent,
    children:[
      {path:'alertas', component:AlertaDerivadaComponent},
    ],
    canActivateChild:[
      SerenazgoGuard
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
export class SerenazgoRoutingModule {}
