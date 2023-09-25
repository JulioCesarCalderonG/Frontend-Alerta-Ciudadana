import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GenerarCodigoService {
  url = `${environment.backendURL}/generarcodigo`;
  constructor(private http: HttpClient, private router:Router) { }

  postGenerarCodigo(body:FormData):Observable<any>{
    return this.http.post(this.url,body)
  }
  eliminarCuenta(id:string):Observable<any>{
    return this.http.delete(`${this.url}/${id}`);
  }
}
