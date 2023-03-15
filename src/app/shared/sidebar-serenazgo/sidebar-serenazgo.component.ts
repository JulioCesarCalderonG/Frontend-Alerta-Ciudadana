import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { SidebarSerenazgoService } from 'src/app/services/sidebar-serenazgo.service';

@Component({
  selector: 'app-sidebar-serenazgo',
  templateUrl: './sidebar-serenazgo.component.html',
  styleUrls: ['./sidebar-serenazgo.component.css']
})
export class SidebarSerenazgoComponent implements OnInit {
  menuItems?: any[];
  usuario?:string;
  constructor(private sidebarService: SidebarSerenazgoService, private loginService: LoginService) {
    this.menuItems = this.sidebarService.menu;
    this.usuario = sessionStorage.getItem('usuario')!;
  }


  ngOnInit(): void {
  }
  logout(){
    this.loginService.loggoud();
  }
}
