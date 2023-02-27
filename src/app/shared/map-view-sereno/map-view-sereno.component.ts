import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Map, Marker, Popup } from 'mapbox-gl';
import { LocalizacionService } from 'src/app/services/localizacion.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-map-view-sereno',
  templateUrl: './map-view-sereno.component.html',
  styleUrls: ['./map-view-sereno.component.css']
})
export class MapViewSerenoComponent implements AfterViewInit {
  @ViewChild('mapDiv') mapDivElement!: ElementRef;
  map?:Map;
  constructor(
    private locationService: LocalizacionService,
    private mapService:MapService
  ) {
    console.log(locationService.useLocationWatch);

  }
  ngAfterViewInit(): void {

    if (!this.locationService.useLocation) throw Error('No hay Ubicacion del Personal');

    this.map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.locationService.useLocation!, // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    const popup = new Popup().setHTML(`
            <h6>Aqui estoy</h6>
            <span>Estoy en este lugar del mundo</span>
          `);
    new Marker({ color: 'red' })
      .setLngLat(this.locationService.useLocation!)
      .setPopup(popup)
      .addTo(this.map);

    this.mapService.setMap(this.map);
  }
}
