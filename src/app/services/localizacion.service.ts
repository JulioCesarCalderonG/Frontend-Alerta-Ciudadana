import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalizacionService {
  
  public useLocation?:[number,number];
 
  get isUserLocationReady():boolean{
    return !!this.useLocation;
  }
  constructor(private http:HttpClient) { 
    this.getUserLocation();
  }

  public async getUserLocation():Promise<[number,number]>{
    return new Promise((resolve, reject)=>{

      navigator.geolocation.getCurrentPosition(
        ({coords})=>{
          this.useLocation = [coords.longitude,coords.latitude];
          console.log(this.useLocation);
          
          resolve(this.useLocation);
        },
        (err)=>{
          alert('No se pudo obtener la geolocalizacion');
          console.log(err);
          reject();
          
        }
      );

    })
  }
  

}
