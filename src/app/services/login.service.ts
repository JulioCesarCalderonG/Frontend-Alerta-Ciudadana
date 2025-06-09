import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WebsocketService } from '../socket/websocket.service';
import { environment } from 'src/environments/environment.prod';
import { pathUrl } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = `${pathUrl}/authusuario`;
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
    const resp = sessionStorage.getItem('id_control');
    if (resp) {
      this.http.put(this.url,{},{params:{
        control:resp
      }}).subscribe(
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


  }
  getToken(){
    return sessionStorage.getItem('x-token');
  }
  getNombre(){
    return sessionStorage.getItem('usuario');
  }
}
