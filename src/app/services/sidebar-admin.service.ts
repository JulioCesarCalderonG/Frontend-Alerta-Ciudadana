import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarAdminService {
  menu: any[] = [
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
