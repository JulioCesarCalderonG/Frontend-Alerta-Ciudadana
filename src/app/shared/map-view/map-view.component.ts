import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Map, Marker, Popup } from 'mapbox-gl';
import { LocalizacionService } from 'src/app/services/localizacion.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
})
export class MapViewComponent implements AfterViewInit {
  @ViewChild('mapDiv') mapDivElement!: ElementRef;
  constructor(
    private locationService: LocalizacionService,
    private mapService:MapService
  ) {
    locationService.useLocationAdmin
  }

  ngAfterViewInit(): void {

    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.544522,-8.38887], // starting position [lng, lat]
      zoom: 14, // starting zoom
    });
    const popup = new Popup().setHTML(`
            <h6>Aqui estoy</h6>
            <span>Estoy en este lugar del mundo</span>
          `);

    const div = document.createElement('div');
    const width = 65;
    const height= 70;
    div.className='marker';
    div.style.backgroundImage=`url(https://res.cloudinary.com/dkxwh94qt/image/upload/v1683831912/coche-de-policia_1_fmjznc.png)`;
    div.style.width=`${width}px`;
    div.style.height=`${height}px`;

    new Marker(div)
      .setLngLat([-74.544522,-8.38887])
      .setPopup(popup)
      .addTo(map);

    this.mapService.setMap(map);
  }
}
