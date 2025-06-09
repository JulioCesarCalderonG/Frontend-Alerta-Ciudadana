import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { pathUrl } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class CiudadanoService {
  url = `${pathUrl}/ciudadano`;
  constructor(private http: HttpClient, private router:Router) { }

  getCiudadanos(estado:string, buscar:string):Observable<any>{
    return this.http.get(this.url, {params:{estado, buscar}});
  }
  deleteCiudadano(id:any,estado:string):Observable<any>{
    return this.http.delete(`${this.url}/${id}`,{params:{estado}})
  }
}
