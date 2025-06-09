import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { pathUrl } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class TipoAtencionService {
  url = `${pathUrl}/tipoatencion`;
  url2 = `${pathUrl}/uploadgeneral`;
  constructor(private http: HttpClient, private router:Router) { }

  getTiposAtencion(estado:string):Observable<any>{
    return this.http.get(this.url, {params:{
      estado
    }});
  }
  getTipoAtencion(id:number):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }
  postTipoAtencion(formdata:FormData):Observable<any>{
    return this.http.post(this.url,formdata);
  }
  putTipoAtencion(formdata:FormData, id:number):Observable<any>{
    return this.http.put(`${this.url}/${id}`,formdata);
  }
  deleteTipoAtencion(id:number, estado:string):Observable<any>{
    return this.http.delete(`${this.url}/${id}`,{params:{
      estado
    }})
  }
  putImagenTipoAtencion(id:number, formData:FormData):Observable<any>{
    return this.http.put(`${this.url2}/tipo-atencion/${id}`, formData);
  }

}
