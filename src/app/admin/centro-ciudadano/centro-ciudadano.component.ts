import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Lugar } from 'src/app/interface/lugar';
@Component({
  selector: 'app-centro-ciudadano',
  templateUrl: './centro-ciudadano.component.html',
  styleUrls: ['./centro-ciudadano.component.css']
})
export class CentroCiudadanoComponent implements OnInit {
  mapa?:mapboxgl.Map;
  markersMapbox: {[id:string]: mapboxgl.Marker} ={};
  constructor() { }

  ngOnInit(): void {
    this.crearMapa();
  }
  crearMapa(){
    this.mapa = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      accessToken: 'pk.eyJ1IjoidGlnZXIxMjE0IiwiYSI6ImNrcDd0cDl2NTAzM2syeG1zdzV4NWEwaGIifQ.xYnNZjDu30SiuGKjzgh_jg',
      center:[-74.569187 , -8.389846],
      zoom:12
    });
  }
  agregarMarcador(marcador:Lugar){
    const h1 = document.createElement('h2');
    h1.innerText = marcador.nombre.toLowerCase();
    const h2 = document.createElement('h2');
    h2.innerText = marcador.vehiculo.toLowerCase();
    //const btnBorrar = document.createElement('button');
    //btnBorrar.innerText = 'Desconectar';
    const div = document.createElement('div');
    div.setAttribute('style','width:100px, height:100px')
    div.append(h1, h2);
    const customPopup = new mapboxgl.Popup({
      offset:25,
      closeOnClick:false
    }).setDOMContent(div);
    const marker = new mapboxgl.Marker({
      draggable:true,
      color:marcador.color,
    })
    .setLngLat([marcador.lng, marcador.lat])
    .setPopup(customPopup)
    .addTo(this.mapa!)

    marker.on('drag', ()=>{
      const lngLat = marker.getLngLat();
      
      //TODO: Crear evento para emitir las coordenadas de este marcador
      const nuevoMarcador ={
        id:marcador.id,
        ...lngLat
      };
      
    });
    this.markersMapbox[marcador.id] = marker;
    


  }
  crearMarcador(){
    const customMarker:Lugar= {
      id: new Date().toISOString(),
      lng: -74.580688 ,  
      lat: -8.365221,
      nombre: 'julio cesar calderon galindo',
      vehiculo: 'vehiculo 3',
      color:'#' + Math.floor(Math.random()*16777215).toString(16) 
    }
    this.agregarMarcador(customMarker);
  }
}
