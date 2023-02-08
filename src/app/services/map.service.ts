import { Injectable } from '@angular/core';
import { AnySourceData, LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Alerta } from '../interface/alerta-filtrada';
import { DireccionApiClient } from '../api-mapbox/api.mapbox';
import { DireccionResponse, Route } from '../interface/direccion';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map?:Map;
  private markers:Marker[]=[];

  constructor(
    private direccionAlerta: DireccionApiClient
  ) { }

  get isMapReady(){
    return !!this.map
  }

  setMap(map:Map){
    this.map = map;
  }

  flyTo(coords:LngLatLike){
    if(!this.isMapReady) throw Error('El mapa no esta inicializado');
    this.map?.flyTo({
      zoom:14,
      center:coords
    })
  }

  createMarkerAlerta(listAlerta:Alerta[], userLocation:[number,number]){
    if(!this.map) throw Error('El mapa no esta inicializado');

    this.markers.forEach(alerta=>alerta.remove());
    const newMakers=[];
    for (const alerta of listAlerta) {
        const popup= new Popup()
                    .setHTML(`
                      <h6>${alerta.TipoAlertum.nombre}</h6>
                      <span>${alerta.descripcion}</span>
                    `);

        const newMarker = new Marker()
              .setLngLat([alerta.lng,alerta.lat])
              .setPopup(popup)
              .addTo(this.map)
        newMakers.push(newMarker)
    }
    this.markers= newMakers
    if(listAlerta.length === 0) return;
    //Limite del mapa
    const bounds = new LngLatBounds();
    bounds.extend(userLocation);
    this.markers.forEach(marker=> bounds.extend(marker.getLngLat()))
    this.map.fitBounds(bounds,{
      padding:300
    })
  }

  getRutaAlerta(start:[number,number], end:[number,number]){
    this.direccionAlerta.get<DireccionResponse>(`/${start.join(',')};${end.join(',')}`)
    .subscribe(resp=>this.marcarPolilinea(resp.routes[0]))
  }
  private marcarPolilinea(route:Route){
    console.log({kms:route.distance/1000, duration:route.duration/60});

    if(!this.map) throw Error('Mapa no incializado');
    const coords = route.geometry.coordinates;
    const start = coords[0] as [number,number];

    const bounds = new LngLatBounds();
    coords.forEach(([lng,lat])=>{
      bounds.extend([lng,lat])
    });

    this.map.fitBounds(bounds,{
      padding:300
    })

    //Polilinea

    const sourceData:AnySourceData= {
      type:'geojson',
      data:{
        type:'FeatureCollection',
        features:[
          {
            type:'Feature',
            properties:{},
            geometry:{
              type:'LineString',
              coordinates:coords
            }
          }
        ]
      }
    }

    // Limpiar Ruta previa
    if(this.map.getLayer('RouteAlerta')){
      this.map.removeLayer('RouteAlerta');
      this.map.removeSource('RouteAlerta');
    }
    this.map.addSource('RouteAlerta', sourceData);
    this.map.addLayer({
      id:'RouteAlerta',
      type:'line',
      source:'RouteAlerta',
      layout:{
        "line-cap":'round',
        "line-join":"round"
      },
      paint:{
        "line-color":'black',
        "line-width":3
      }
    })

  }
}
