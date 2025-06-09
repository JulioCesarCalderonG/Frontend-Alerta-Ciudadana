import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { pathUrl } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class SunatService {
  url = `${pathUrl}/validarsunat`;
  constructor(private http: HttpClient, private router:Router) { }

  postSunat(formData:FormData):Observable<any>{
    return this.http.post(`${this.url}/usuario`,formData);
  }
}
