import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EnvioAlertGet } from '../interface/search-form';
import { pathUrl } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class AlertaGeneradaService {
  url = `${pathUrl}/alertagenerada`;
  url2 = `${pathUrl}/reporte`;
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  getAlerta(data: EnvioAlertGet, tipo: string): Observable<any> {
    return this.http.post(`${this.url}/filtro/alerta`, data, { params: { tipo } });
  }
  postAlertaGenerada(formData:FormData):Observable<any>{
    return this.http.post(this.url,formData);
  }
  putAlertaGenerada(formData:FormData, id:number):Observable<any>{
    return this.http.put(`${this.url}/${id}`,formData);
  }
  postAlertaReporte(data: EnvioAlertGet, tipo: string): Observable<any> {
      return this.http.post(`${this.url2}/alertageneral`, data, { params: { tipo } });
  }
}
