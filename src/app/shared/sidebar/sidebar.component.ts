import { Component, OnInit } from '@angular/core';
import { SidebarAdminService } from 'src/app/services/sidebar-admin.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  menuItems?: any[];
  constructor(private sidebarService: SidebarAdminService) {
    this.menuItems = sidebarService.menu;
    console.log(this.menuItems)
  }

  ngOnInit(): void {
  }

}
