import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Map, Marker, Popup } from 'mapbox-gl';
import { LocalizacionService } from 'src/app/services/localizacion.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-map-view-sereno',
  templateUrl: './map-view-sereno.component.html',
  styleUrls: ['./map-view-sereno.component.css']
})
export class MapViewSerenoComponent implements OnInit {
  @ViewChild('mapDiv') mapDivElement!: ElementRef;
  constructor(
    private locationService: LocalizacionService,
    private mapService:MapService
  ) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    console.log(this.locationService.useLocation);

    if (!this.locationService.useLocationWatch)
      throw Error('No hay Ubicacion del Personal');
    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.locationService.useLocationWatch, // starting position [lng, lat]
      zoom: 14, // starting zoom
    });
    const popup = new Popup().setHTML(`
            <h6>Aqui estoy</h6>
            <span>Estoy en este lugar del mundo</span>
          `);
    new Marker({ color: 'red' })
      .setLngLat(this.locationService.useLocationWatch)
      .setPopup(popup)
      .addTo(map);

    this.mapService.setMap(map);
  }
}
