import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoAlertaService {
  url = `${environment.backendURL}/tipoalerta`;
  url2 = `${environment.backendURL}/uploadgeneral`;
  constructor(private http: HttpClient, private router:Router) { }
  getTipoAlertas(estado:string):Observable<any>{
    return this.http.get(this.url,{params:{estado}});
  }
  getTipoAlerta(id:number):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }
  postTipoAlerta(formData:FormData):Observable<any>{
    return this.http.post(this.url, formData);
  }
  putTipoAlerta(formData:FormData, id:string):Observable<any>{
    return this.http.put(`${this.url}/${id}`, formData);
  }
  deleteTipoAlerta(id:number, estado:string):Observable<any>{
    return this.http.delete(`${this.url}/${id}`,{params:{estado}});
  }
  actualizarImage(formData:FormData, id:string){
    return this.http.put(`${this.url2}/tipo-alerta/${id}`, formData);
  }
}
