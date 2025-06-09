import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { pathUrl } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {
  url = `${pathUrl}/ubicacion`;
  constructor(private http: HttpClient, private router:Router) {
  }

  mostrarVehiculos():Observable<any>{
    return this.http.get(`${this.url}/mapa`);
  }

}
