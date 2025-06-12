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
        { titulo: 'Mostrar alertas Spam', url: 'alerta-spam' },
        /* { titulo: 'Mostrar alertas derivadas', url: 'alerta-derivada' }, */
      ]
    },
    {
      titulo: 'Alerta Derivada',
      icono: 'mdi mdi-alert-octagram',
      submenu: [
        { titulo: 'Alerta Derivada', url: 'alerta-derivada' },
        /* { titulo: 'Mostrar alertas Spam', url: 'alerta-spam' }, */
        /* { titulo: 'Mostrar alertas derivadas', url: 'alerta-derivada' }, */
      ]
    },
    {
      titulo: 'Tipo de Alerta',
      icono: 'mdi mdi-alert-octagram',
      submenu: [
        { titulo: 'Mostrar alertas General', url: 'alerta' },
        /* { titulo: 'Mostrar alertas Spam', url: 'alerta-spam' }, */
        /* { titulo: 'Mostrar alertas derivadas', url: 'alerta-derivada' }, */
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
      titulo: 'Administrar Vehiculos',
      icono: 'mdi mdi-alert-octagram',
      submenu: [
        { titulo: 'Administrar Vehiculos', url: 'post-vehiculos' },
      ]
    },
    {
      titulo: 'Tipo de Delito',
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
    },
    {
      titulo: 'Reportes',
      icono: 'mdi mdi-account-card-details',
      submenu: [
        { titulo: 'Reporte de ciudadanos', url: 'reporte-ciudadano' },
        { titulo: 'Reporte del control del sistema', url: 'reporte-control' },
        { titulo: 'Reporte de tipos de alertas', url: 'reporte-tipo-alerta' },
        { titulo: 'Reporte de alertas derivadas', url: 'reporte-alerta-derivada' },
      ]
    }
  ];
  menu2:any[]=[
    {
      titulo: 'Alerta Ciudadana',
      icono: 'mdi mdi-alert-octagram',
      submenu: [
        { titulo: 'Ultimas 24 Horas', url: 'ultimas-24-horas' },
        /* { titulo: 'Mostrar alertas Spam', url: 'alerta-spam' }, */
        /* { titulo: 'Mostrar alertas derivadas', url: 'alerta-derivada' }, */
      ]
    },
    {
      titulo: 'Alerta Derivada',
      icono: 'mdi mdi-alert-octagram',
      submenu: [
        { titulo: 'Alerta Derivada', url: 'alerta-derivada' },
        /* { titulo: 'Mostrar alertas Spam', url: 'alerta-spam' }, */
        /* { titulo: 'Mostrar alertas derivadas', url: 'alerta-derivada' }, */
      ]
    },
    {
      titulo: 'Tipo de Alerta',
      icono: 'mdi mdi-alert-octagram',
      submenu: [
        { titulo: 'Mostrar alertas General', url: 'alerta' },
        /* { titulo: 'Mostrar alertas Spam', url: 'alerta-spam' }, */
        /* { titulo: 'Mostrar alertas derivadas', url: 'alerta-derivada' }, */
      ]
    },
    {
      titulo: 'Vehiculos',
      icono: 'mdi mdi-alert-octagram',
      submenu: [
        { titulo: 'Vehiculos Activos', url: 'vehiculos' },
      ]
    }
  ]
  constructor() { }
}
