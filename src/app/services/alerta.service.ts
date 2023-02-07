import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { EnvioAlertGet } from '../interface/search-form';
import { Alerta, AlertaFiltrada } from '../interface/alerta-filtrada';

@Injectable({
  providedIn: 'root',
})
export class AlertaService {
  url = `${environment.backendURL}/alerta`;
  public isCargaDatos:boolean=false;
  public listAlertas?: Alerta[];
  constructor(private http: HttpClient, private router: Router) {}
  getAlerta(data: EnvioAlertGet, tipo: string): Observable<any> {
    return this.http.post(`${this.url}/filtro/alerta`, data, { params: { tipo } });
  }
  getFiltroAlerta(buscar:string){
    this.isCargaDatos = true;
    this.http.get<AlertaFiltrada>(`${this.url}/mostrar/filtro/alerta`,{params:{buscar}}).subscribe(
      resp=>{
        this.isCargaDatos = false;
        this.listAlertas = resp.alerta;
        console.log(this.listAlertas);
        
      }
    )
  }
  
}
