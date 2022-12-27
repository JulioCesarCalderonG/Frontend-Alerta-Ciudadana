import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { EnvioAlertGet } from '../interface/search-form';

@Injectable({
  providedIn: 'root',
})
export class AlertaService {
  url = `${environment.backendURL}/alerta`;
  constructor(private http: HttpClient, private router: Router) {}
  getAlerta(data: EnvioAlertGet, tipo: string): Observable<any> {
    return this.http.post(`${this.url}/filtro/alerta`, data, { params: { tipo } });
  }
  
}
