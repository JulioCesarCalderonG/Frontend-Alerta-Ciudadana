import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { LoginService } from '../services/login.service';


@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivateChild {
   private rutasBloqueadas = [
    'usuario',
    'ciudadano',
    'tipo-atencion',
    'centro-atencion',
    'control-personal',
    'reporte-ciudadano',
    'reporte-control',
    'reporte-tipo-alerta',
    'reporte-alerta-derivada',
    'tipo-alerta'
  ];

  constructor(private authService: LoginService, private router: Router){
  }
  canActivateChild(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.authService.getToken() !== null) {
      const dataDecode: any = this.decodeToken();
      const date = new Date();
      // Comprobar que no esta caducado el token
      if (dataDecode.exp < date.getTime() / 1000) {
        return this.redirect();
      }
      if (dataDecode.cargo !== 'UA' && dataDecode.cargo !=='UO') {
        return this.redirect();
      }
      // Si es UO, restringir ciertas rutas
      if (dataDecode.cargo === 'UO') {
        const url = state.url.toLowerCase();
        const estaBloqueada = this.rutasBloqueadas.some(ruta => url.includes(ruta));
        if (estaBloqueada) {
          return this.redirectDashboard();
        }
      }
      return true;
    }
    return this.redirect();
  }
  redirect() {
    this.router.navigate(['/']);
    return false;
  }
  decodeToken() {
    return jwtDecode(`${this.authService.getToken()}`);
  }
  private redirectDashboard(): boolean {
    this.router.navigate(['/admin']);
    return false;
  }
}
