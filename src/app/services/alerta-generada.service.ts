import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { EnvioAlertGet } from '../interface/search-form';

@Injectable({
  providedIn: 'root'
})
export class AlertaGeneradaService {
  url = `${environment.backendURL}/alertagenerada`;
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

}
