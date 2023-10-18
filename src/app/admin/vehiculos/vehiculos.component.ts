import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Vehiculo } from 'src/app/interface/vehiculo';
@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {

  mapa?:mapboxgl.Map;
  lugares: Vehiculo[] = [{
    id :'1',
    nombre:'Julio cesar',
    id_vehiculo:'1',
    vehiculo:'vehiculo 1',
    lng:-74.562492,
    lat:-8.362674,
    color:'#dd8fee'
},
{
  id :'2',
  nombre:'Juanito perez',
  id_vehiculo:'2',
  vehiculo:'vehiculo 2',
  lng:-74.588585,
  lat:-8.383223,
  color:'#790af0'
},
{
  id :'3',
  nombre:'Pedro suarez',
  id_vehiculo:'3',
  vehiculo:'vehiculo 3',
  lng:-74.58292,
  lat:-8.411074,
  color:'#19884b'
}];
  constructor() { }

  ngOnInit(): void {
    this.crearMapa();
  }

  crearMapa() {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiY2VzYXIxMjE0IiwiYSI6ImNrdTJzdnR4bjRiNjQycXBxemJ5YWs0cmkifQ.nuKwaMp6GcopSRRkYr1zKw';
    this.mapa = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.544522, -8.38887],
      zoom:12
    });
    for(const marcador of this.lugares){
      this.agregarVehiculo(marcador);
    }
  }
  agregarVehiculo(marcador:Vehiculo){
    const html= `<h6>Conductor: <strong>${marcador.nombre}</strong></h6>
                        <br>
                        <h6>Vehiculo: <strong>${marcador.vehiculo}</strong></h6>
    `;
    const customPopup = new mapboxgl.Popup({
      offset:25,
      closeOnClick:true,
    }).setHTML(html);

    const marker = new mapboxgl.Marker({
      draggable:true,
      color:marcador.color,
    })
    .setLngLat([marcador.lng,marcador.lat])
    .setPopup(customPopup)
    .addTo(this.mapa!)
  }
}
