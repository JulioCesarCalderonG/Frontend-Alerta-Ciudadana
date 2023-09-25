import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CuentaComponent } from './cuenta.component';
import { ValidarDatosComponent } from './validar-datos/validar-datos.component';
import { EliminarCuentaComponent } from './eliminar-cuenta/eliminar-cuenta.component';
import { ExitosoComponent } from './exitoso/exitoso.component';


const routes: Routes = [
  {
    path: 'eliminar-cuenta',
    component: CuentaComponent,
    children:[
      {path:'',component:ValidarDatosComponent},
      {path:'eliminar',component:EliminarCuentaComponent},
      {path:'exitoso',component:ExitosoComponent}
    ]

  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentaRoutingModule {}
