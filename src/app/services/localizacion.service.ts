import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalizacionService {

  public useLocation?:[number,number];
  public useLocationAdmin?:[number,number];
  get isUserLocationReady():boolean{
    return !!this.useLocation;
  }
  get isUserLocationAdminReady():boolean{
    return !!this.useLocationAdmin;
  }
  constructor(private http:HttpClient) {
    this.getUserLocation();
    this.getUserLocationAdmin();
  }

  public async getUserLocation():Promise<[number,number]>{
    return new Promise((resolve, reject)=>{

      navigator.geolocation.getCurrentPosition(
        ({coords})=>{
          this.useLocation = [-74.544468, -8.388828];

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

  public async getUserLocationAdmin():Promise<[number,number]>{
    return new Promise((resolve, reject)=>{

      navigator.geolocation.getCurrentPosition(
        ({coords})=>{
          this.useLocationAdmin = [-74.544468, -8.388828];

          resolve(this.useLocationAdmin);
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
