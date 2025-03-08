import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EnvioAlertGet } from '../interface/search-form';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlertaGeneradaService {
  url = `${environment.backendURL}/alertagenerada`;
  url2 = `${environment.backendURL}/reporte`;
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
  postAlertaReporte(data: EnvioAlertGet, tipo: string): Observable<any> {
      return this.http.post(`${this.url2}/alertageneral`, data, { params: { tipo } });
  }
}
