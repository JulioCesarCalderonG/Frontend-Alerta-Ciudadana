import { Injectable } from '@angular/core';
import { pathUrl } from '../api/api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  url = `${pathUrl}/reporte`;
  constructor(private http: HttpClient) {}
  pdfCiudadano(): Observable<Blob>  {
    return this.http.post(`${this.url}/ciudadano`,{}, {
      responseType: 'blob'
    });
  }
  pdfControlSistema(): Observable<Blob>  {
    return this.http.post(`${this.url}/controlsistema`,{}, {
      responseType: 'blob'
    });
  }
  pdfAlertaDerivada(): Observable<Blob>  {
    return this.http.post(`${this.url}/alertaderivada`,{}, {
      responseType: 'blob'
    });
  }
}
