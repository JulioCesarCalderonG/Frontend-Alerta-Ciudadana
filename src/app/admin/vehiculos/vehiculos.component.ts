import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Vehiculo } from 'src/app/interface/vehiculo';
import { VehiculosService } from 'src/app/services/vehiculos.service';
import { WebsocketService } from 'src/app/socket/websocket.service';


interface RespVehiculo {
  [key: string]: Vehiculo
}

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})

export class VehiculosComponent implements OnInit {

  mapa?: mapboxgl.Map;
  //lugares: Vehiculo[] = [];
  lugares: RespVehiculo = {};
  markersMapbox: { [key: string]: mapboxgl.Marker } = {};
  constructor(
    private vehiculoService: VehiculosService,
    private wsService: WebsocketService
  ) { }

  ngOnInit(): void {
    this.mostrarVehiculos();
    this.escucharSocket();
  
  }

  mostrarVehiculos() {
    this.vehiculoService.mostrarVehiculos().subscribe(
      (data: RespVehiculo) => {
        this.lugares = {
          '1': {
            color: '#acff33',
            id: '1',
            id_vehiculo: '1',
            lat: -8.395705,
            lng: -74.590645,
            nombre: 'Serenazgo: Carlos Calderon Luna',
            vehiculo: 'vehiculo 01'
          },
          '2': {
            color: '#ff7433',
            id: '2',
            id_vehiculo: '2',
            lat: -8.36641,
            lng: -74.552021,
            nombre: 'Serenazgo: Henrry Bardales Ferreira',
            vehiculo: 'vehiculo 02'
          }
        };
        this.crearMapa();
      },
      error => {
        console.log(error);

      }
    )
  }

  crearMapa() {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiY2VzYXIxMjE0IiwiYSI6ImNrdTJzdnR4bjRiNjQycXBxemJ5YWs0cmkifQ.nuKwaMp6GcopSRRkYr1zKw';
    this.mapa = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.544522, -8.38887],
      zoom: 12
    });
    for (const [key, marcador] of Object.entries(this.lugares)) {
      this.agregarVehiculo(marcador);
    }
  }
  escucharSocket() {
    //Marcador - Nuevo
    this.wsService.listen('vehiculo-nuevo').subscribe(
      (data: any) => {
        console.log(data);
        this.agregarVehiculo(data)
      }
    )
    //Marcado - Mover
    this.wsService.listen('vehiculo-mover').subscribe(
      (data: any) => {
        this.markersMapbox[data.id].setLngLat([data.lng, data.lat]);
      }
    )
    //Marcado - Borrar
    this.wsService.listen('vehiculo-borrar').subscribe(
      (data: any) => {
        this.markersMapbox[data].remove();
        delete this.markersMapbox[data];
      }
    )


  }
  agregarVehiculo(marcador: Vehiculo) {
    /* const html= `<h6>Conductor: <strong>${marcador.nombre}</strong></h6>
                        <br>
                        <h6>Vehiculo: <strong>${marcador.vehiculo}</strong></h6>
    `; */

    const h2 = document.createElement('h6');
    h2.innerText = marcador.nombre;

    const hv = document.createElement('h6');
    hv.innerText = marcador.vehiculo;
    //const btnBorrar = document.createElement('button');
    //btnBorrar.innerText = 'Borrar';

    const div = document.createElement('div');
    div.append(h2,hv);
    const customPopup = new mapboxgl.Popup({
      offset: 25,
      closeOnClick: true,
    }).setDOMContent(div)
 
    const marker = new mapboxgl.Marker({
      draggable: true,
      color: marcador.color,
    })
      .setLngLat([marcador.lng, marcador.lat])
      .setPopup(customPopup)
      .addTo(this.mapa!)

    marker.on('drag', () => {
      const lngLat = marker.getLngLat();
      //TODO: crear evento para emitir coordenadas;
      const nuevoMarcador = {
        id: marcador.id,
        ...lngLat
      }
      this.wsService.emit('vehiculo-mover', nuevoMarcador);
    });
    /* btnBorrar.addEventListener('click', () => {
      marker.remove();
      this.wsService.emit('vehiculo-borrar', marcador.id);
      //TODO:Eliminar el marcador por sockets



    }) */
    this.markersMapbox[marcador.id] = marker;
    console.log(this.markersMapbox);

  }
  crearMarcador() {
    const customMarker: Vehiculo = {
      color: '#' + Math.floor(Math.random() * 16777215).toString(16),
      id: new Date().toISOString(),
      lat: -8.38887,
      lng: -74.544522,
      vehiculo: 'sin-vehiculo',
      nombre: 'sin-nombre',
      id_vehiculo: new Date().toISOString()
    }
    this.agregarVehiculo(customMarker);
    this.wsService.emit('vehiculo-nuevo', customMarker);
  }
}
