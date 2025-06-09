import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { pathUrl } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class OpcionFotoService {
  url = `${pathUrl}/opcionfoto`;
  constructor(private http: HttpClient, private router:Router) { }

  getOpcionFotos():Observable<any>{
    return this.http.get(this.url);
  }
}
