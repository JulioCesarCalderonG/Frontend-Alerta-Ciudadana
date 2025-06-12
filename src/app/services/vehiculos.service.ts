import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pathUrl } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {
  url = `${pathUrl}/ubicacion`;
  url2 = `${pathUrl}/vehiculo`;
  constructor(private http: HttpClient, private router:Router) {
  }

  mostrarVehiculos():Observable<any>{
    return this.http.get(`${this.url}/mapa`);
  }
  mostrarVehiculosPost(estado:string):Observable<any>{
    return this.http.get(`${this.url2}`,{params:{
      estado
    }});
  }
  guardarVehiculosPost(formData:FormData):Observable<any>{
    return this.http.post(`${this.url2}`,formData);
  }
  editarVehiculosPost(formData:FormData, id:number):Observable<any>{
    return this.http.put(`${this.url2}/${id}`,formData);
  }
  deleteVehiculosPost(id:number, estado:string):Observable<any>{
    return this.http.delete(`${this.url2}/${id}`,{params:{estado}});
  }
}
