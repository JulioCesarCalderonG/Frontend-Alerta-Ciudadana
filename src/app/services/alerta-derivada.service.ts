import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertaDerivadaService {
  url = `${environment.backendURL}/alertaderivada`;
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  getAlertasDerivadas(tipo:string):Observable<any>{
    return this.http.get(this.url,{params:{tipo}});
  }

  postAlertaDerivada(formData:FormData):Observable<any>{
    return this.http.post(this.url, formData);
  }
}
