import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarAdminService {
  menu: any[] = [
    {
      titulo: 'admin',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Centro de Atencion', url: 'centro-atencion' },
        { titulo: 'Gráficas', url: 'grafica1' },
        { titulo: 'ProgressBar', url: 'progress' },
      ]
    },
    {
      titulo: 'usuario',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Gráficas', url: 'grafica1' },
        { titulo: 'ProgressBar', url: 'progress' },
        { titulo: 'Gráficas', url: 'grafica1' },
        { titulo: 'ProgressBar', url: 'progress' },
      ]
    },
  ];
  constructor() { }
}
