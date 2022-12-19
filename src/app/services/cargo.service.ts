import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargoService {
  url = `${environment.backendURL}/cargo`;
  constructor(private http: HttpClient, private router:Router) { }
  getCargos():Observable<any>{
    return this.http.get(this.url);
  }
}
