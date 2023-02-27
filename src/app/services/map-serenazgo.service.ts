import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from  '@mapbox/mapbox-gl-geocoder';
import { LocalizacionService } from './localizacion.service';

@Injectable({
  providedIn: 'root'
})
export class MapSerenazgoService {
  mapbox=(mapboxgl as typeof mapboxgl);
  map?:mapboxgl.Map;
  style ='mapbox://styles/mapbox/streets-v12';
  zoom = 14;
  constructor(private localizacionService:LocalizacionService) {

  }

  buildMapa():Promise<any>{
    if (!this.localizacionService.useLocation)
      throw Error('No hay Ubicacion del Personal');
    return new Promise((resolve,reject)=>{
      try {
        this.map = new mapboxgl.Map({
          container:'map',
          style:this.style,
          zoom:this.zoom,
          center:this.localizacionService.useLocation
        });
        resolve({
          map:this.map
        })
      } catch (error) {
        reject(error)
      }

    })
  }
}
