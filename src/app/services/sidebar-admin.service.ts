import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarAdminService {
  menu: any[] = [
    {
      titulo: 'Alerta Ciudadana',
      icono: 'mdi mdi-alert-octagram',
      submenu: [
        { titulo: 'Mostrar alertas derivadas', url: 'alerta-derivada' },
        { titulo: 'Mostrar alertas', url: 'alerta' },
      ]
    },
    {
      titulo: 'Tipo de Alerta',
      icono: 'mdi mdi-alert-box',
      submenu: [
        { titulo: 'Mostrar tipo de alertas', url: 'tipo-alerta' },
      ]
    },
    {
      titulo: 'Usuarios',
      icono: 'mdi mdi-account-circle',
      submenu: [
        { titulo: 'Usuarios del sistema', url: 'usuario' },
      ]
    },
    {
      titulo: 'Ciudadano',
      icono: 'mdi mdi-account-card-details',
      submenu: [
        { titulo: 'Ciudadanos Registrados', url: 'ciudadano' },
      ]
    },
    {
      titulo: 'Lugar de Atencion',
      icono: 'mdi mdi-ambulance',
      submenu: [
        { titulo: 'Tipo de Atencion', url: 'tipo-atencion' },
        { titulo: 'Centro de Atencion', url: 'centro-atencion' },
      ]
    },
    
    {
      titulo: 'admin',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Gráficas', url: 'grafica1' },
        { titulo: 'ProgressBar', url: 'progress' },
      ]
    },
  ];
  constructor() { }
}
