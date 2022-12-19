import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SunatService {
  url = `${environment.backendURL}/validarsunat`;
  constructor(private http: HttpClient, private router:Router) { }
  
  postSunat(formData:FormData):Observable<any>{
    return this.http.post(this.url,formData);
  }
}
