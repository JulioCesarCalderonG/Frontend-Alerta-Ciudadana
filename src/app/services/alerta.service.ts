import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { EnvioAlertGet } from '../interface/search-form';
import { Alerta, AlertaFiltrada } from '../interface/alerta-filtrada';
import { MapService } from './map.service';
import { LocalizacionService } from './localizacion.service';

@Injectable({
  providedIn: 'root',
})
export class AlertaService {
  url = `${environment.backendURL}/alerta`;
  public isCargaDatos:boolean=false;
  public listAlertas: Alerta[]=[];
  constructor(
    private http: HttpClient,
    private router: Router,
    private mapService:MapService,
    private locationService:LocalizacionService
  ) {}
  getAlerta(data: EnvioAlertGet, tipo: string): Observable<any> {
    return this.http.post(`${this.url}/filtro/alerta`, data, { params: { tipo } });
  }
  getAlertaId(id:number):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }
  getFiltroAlerta(buscar:string){
    this.isCargaDatos = true;
    this.http.get<AlertaFiltrada>(`${this.url}/mostrar/filtro/alerta`,{params:{buscar}}).subscribe(
      resp=>{
        this.isCargaDatos = false;
        this.listAlertas = resp.alerta;
        this.mapService.createMarkerAlerta(this.listAlertas, this.locationService.useLocation!);
      }
    )
  }
  putAtenderAlerta(id:number):Observable<any>{
    return this.http.put(`${this.url}/atencion/${id}`,{});
  }
  putSpamAlerta(id:number,data:{spam:number}):Observable<any>{
    return this.http.put(`${this.url}/spam/${id}`,data);
  }
}
