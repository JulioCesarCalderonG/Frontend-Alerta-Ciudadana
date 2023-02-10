import { Component, OnInit } from '@angular/core';
import { SidebarSerenazgoService } from 'src/app/services/sidebar-serenazgo.service';

@Component({
  selector: 'app-sidebar-serenazgo',
  templateUrl: './sidebar-serenazgo.component.html',
  styleUrls: ['./sidebar-serenazgo.component.css']
})
export class SidebarSerenazgoComponent implements OnInit {
  menuItems?: any[];
  constructor(private sidebarService: SidebarSerenazgoService) {
    this.menuItems = this.sidebarService.menu;
  }


  ngOnInit(): void {
  }

}
