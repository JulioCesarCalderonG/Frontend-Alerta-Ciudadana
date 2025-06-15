import { Injectable } from '@angular/core';
import { pathUrl } from '../api/api';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpamService {
  url = `${pathUrl}/alerta`;
  constructor(private http: HttpClient, private router:Router) { }
  getSpam():Observable<any>{
    return this.http.get(`${this.url}/alerta/spam`);
  }
}
