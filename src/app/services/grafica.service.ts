import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GraficaService {
  url = `${environment.backendURL}/grafica`;
  constructor(private http: HttpClient, private router:Router) { }

  getAlertas():Observable<any>{
    return this.http.get(`${this.url}/alerta`);
  }
  getAlertasTotal():Observable<any>{
    return this.http.get(`${this.url}/alerta/total`);
  }
  getAlertasGenerada():Observable<any>{
    return this.http.get(`${this.url}/alertagenerada`);
  }
  getAlertasGeneradaTotal():Observable<any>{
    return this.http.get(`${this.url}/alertagenerada/total`);
  }
}
