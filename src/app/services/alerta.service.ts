import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {
  url = `${environment.backendURL}/alerta`;
  constructor(private http: HttpClient, private router:Router) { }
  getAlerta():Observable<any>{
    return this.http.get(this.url);
  }
}
