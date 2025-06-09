import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { SidebarAdminService } from 'src/app/services/sidebar-admin.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [
     "./sidebar.component.css"
  ]
})
export class SidebarComponent implements OnInit {
  menuItems?: any[];
  usuario?:string;
  constructor(private sidebarService: SidebarAdminService, private loginService: LoginService) {
    const cargo = sessionStorage.getItem('cargo')!;
    if (cargo=='UA') {
      this.menuItems = this.sidebarService.menu;
    }else{
      this.menuItems = this.sidebarService.menu2;
    }
    
    this.usuario = sessionStorage.getItem('usuario')!;
  }

  ngOnInit(): void {
  }
  logout(){
    this.loginService.loggoud();
  }
}
