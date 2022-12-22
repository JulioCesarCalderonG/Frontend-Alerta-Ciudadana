import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CentroAtencionService {
  url = `${environment.backendURL}/centroatencion`;
  constructor(private http: HttpClient, private router:Router) { }
  
  getCentroAtenciones(estado:string):Observable<any>{
    return this.http.get(this.url,{params:{estado}});
  }
  getCentroAtencione(id:number):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }
  postCentroAtencion(formData:FormData):Observable<any>{
    return this.http.post(this.url, formData);
  }
  putCentroAtencion(formData:FormData, id:number):Observable<any>{
    return this.http.put(`${this.url}/${id}`,formData);
  }
  deleteCentroAtencion(id:number, estado:string):Observable<any>{
    return this.http.delete(`${this.url}/${id}`,{params:{estado}});
  }
}
