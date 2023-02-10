import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarSerenazgoService {
  menu: any[] = [
    {
      titulo: 'Alertas Derivadas',
      icono: 'mdi mdi-alert-octagram',
      submenu: [
        { titulo: 'Mostrar Alertas', url: 'alertas' },
      ]
    },
  ];
  constructor() { }
}
