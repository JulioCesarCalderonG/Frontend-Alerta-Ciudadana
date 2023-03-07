import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertaDerivada, ResultFiltroDerivada } from '../interface/alerta-derivada-filtrada';
import { MapService } from './map.service';
import { LocalizacionService } from './localizacion.service';

@Injectable({
  providedIn: 'root'
})
export class AlertaDerivadaService {
  url = `${environment.backendURL}/alertaderivada`;
  public isCargaDatos:boolean=true;
  public listAlerta:AlertaDerivada[]=[];
  constructor(
    private http: HttpClient,
    private router: Router,
    private mapService:MapService,
    private locationService:LocalizacionService
  ) { }

  getAlertasDerivadas(tipo:string):Observable<any>{
    return this.http.get(this.url,{params:{tipo}});
  }
  getAlertaDerivada(id:number):Observable<any>{
    return this.http.get(`${this.url}/${id}`)
  }
  postAlertaDerivada(formData:FormData):Observable<any>{
    return this.http.post(this.url, formData);
  }
  putAlertaDerivada(formData:FormData, id:number):Observable<any>{
    return this.http.put(`${this.url}/${id}`,formData);
  }
  deleteAlerta(id:number):Observable<any>{
    return this.http.delete(`${this.url}/${id}`);
  }
  getAlertaDerivadaSereno(buscar:string){
    this.http.get<ResultFiltroDerivada>(`${this.url}/validar/usuario`).subscribe(
      resp=>{
        this.isCargaDatos = false;
        this.listAlerta = resp.alertaDerivada;
        this.mapService.createMarkerAlertaDerivada(this.listAlerta, this.locationService.useLocation!);
      }
    )
  }
}
