import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalizacionWatchService {
  public useLocationWatch?:[number,number];
  get isUserLocationWatchReady():boolean{
    return !!this.useLocationWatch;
  }
  constructor(private http:HttpClient) {
    this.getUserLocationWatch();
  }
  public async getUserLocationWatch():Promise<[number,number]>{
    return new Promise((resolve, reject)=>{

      navigator.geolocation.watchPosition(
        ({coords})=>{

          this.useLocationWatch = [coords.longitude, coords.latitude];
          resolve(this.useLocationWatch);
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
