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
        { titulo: 'Ultimas 24 Horas', url: 'ultimas-24-horas' },
        { titulo: 'Mostrar alertas General', url: 'alerta' },
        { titulo: 'Mostrar alertas derivadas', url: 'alerta-derivada' },
      ]
    },
    {
      titulo: 'Vehiculos',
      icono: 'mdi mdi-alert-octagram',
      submenu: [
        { titulo: 'Vehiculos Activos', url: 'vehiculos' },
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
      titulo: 'Control Personal',
      icono: 'mdi mdi-account-card-details',
      submenu: [
        { titulo: 'Mostrar Personal', url: 'control-personal' },
      ]
    }
  ];
  constructor() { }
}
