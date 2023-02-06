import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SearchAlertaComponent } from './search-alerta/search-alerta.component';
import { ToastrModule } from 'ngx-toastr';
import { LoadingComponent } from './loading/loading.component';
import { MapViewComponent } from './map-view/map-view.component';



@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    SearchComponent,
    SearchAlertaComponent,
    LoadingComponent,
    MapViewComponent
  ],
  exports:[
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    SearchComponent,
    SearchAlertaComponent,
    LoadingComponent,
    MapViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule
  ]
})
export class SharedModule { }
