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
import { BtnMiLocacionComponent } from './btn-mi-locacion/btn-mi-locacion.component';
import { AngularLogoComponent } from './angular-logo/angular-logo.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SidebarSerenazgoComponent } from './sidebar-serenazgo/sidebar-serenazgo.component';
import { MapViewSerenoComponent } from './map-view-sereno/map-view-sereno.component';
import { SearchBarSerenoComponent } from './search-bar-sereno/search-bar-sereno.component';
import { SearchResultsSerenoComponent } from './search-results-sereno/search-results-sereno.component';



@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    SearchComponent,
    SearchAlertaComponent,
    LoadingComponent,
    MapViewComponent,
    BtnMiLocacionComponent,
    AngularLogoComponent,
    SearchBarComponent,
    SearchResultsComponent,
    SidebarSerenazgoComponent,
    MapViewSerenoComponent,
    SearchBarSerenoComponent,
    SearchResultsSerenoComponent
  ],
  exports:[
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    SearchComponent,
    SearchAlertaComponent,
    LoadingComponent,
    MapViewComponent,
    BtnMiLocacionComponent,
    AngularLogoComponent,
    SearchBarComponent,
    SearchResultsComponent,
    SidebarSerenazgoComponent,
    MapViewSerenoComponent,
    SearchBarSerenoComponent
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
