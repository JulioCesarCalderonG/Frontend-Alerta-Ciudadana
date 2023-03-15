import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { WebsocketService } from '../socket/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = `${environment.backendURL}/authusuario`;
  constructor(
    private http: HttpClient,
    private router:Router,
    private ws:WebsocketService
  ) { }
  login(data:FormData):Observable<any>{
    return this.http.post(this.url, data);
  }
  loggedIn(){
    return !!sessionStorage.getItem('x-token');
  }
  loggoud(){
    this.http.put(this.url,{}).subscribe(
      (data)=>{
        sessionStorage.removeItem('x-token');
        this.ws.emit('logout-sesion');
        this.router.navigate(['/login']);
      },
      (error)=>{
        console.log(error);
      }
    );

  }
  getToken(){
    return sessionStorage.getItem('x-token');
  }
  getNombre(){
    return sessionStorage.getItem('usuario');
  }
}
