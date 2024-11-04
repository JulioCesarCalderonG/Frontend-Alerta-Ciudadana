import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { Alerta, ResultAlertas } from 'src/app/interface/alerta';
import { AlertaMapa } from 'src/app/interface/alerta-form';
import { EnvioAlertGet, FiltroForm } from 'src/app/interface/search-form';
import { AlertaGeneradaService } from 'src/app/services/alerta-generada.service';
import { AlertaService } from 'src/app/services/alerta.service';
import { LocalizacionService } from 'src/app/services/localizacion.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css'],
})
export class AlertasComponent implements OnInit {
  mapa?: mapboxgl.Map;
  mapa2?: mapboxgl.Map;
  listAlerta?: Array<Alerta>;
  url=environment.backendURL;
  constructor(
    private alertaService: AlertaGeneradaService,
    private renderer2: Renderer2,
    private locationService:LocalizacionService,
    private router:Router
  ) {}

  ngOnInit(): void {
    //this.crearMapa();
    this.mostrarAlerta();
    //this.crearMapa2();
  }

  mostrarAlerta() {
    this.alertaService.getAlerta({fechaDos:'',fechaUno:'',tipoAlerta:''},'4').subscribe(
      (data)=>{
        //console.log(data);
          this.listAlerta = data.results;
          this.crearMapa();
          console.log(data);

      },(error)=>{
        console.log(error);

      }
    )
  }
  crearMapa() {
    this.mapa = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      accessToken:
        'pk.eyJ1IjoidGlnZXIxMjE0IiwiYSI6ImNrcDd0cDl2NTAzM2syeG1zdzV4NWEwaGIifQ.xYnNZjDu30SiuGKjzgh_jg',
      //center: [-74.96366, -8.640309],
      center: [-74.544468, -8.388828],
      zoom: 14,
    });
    if (this.listAlerta!.length >= 1) {
      this.listAlerta?.map((resp) => {
        const envioMapa: AlertaMapa = {
          id: resp.id,
          lat: resp.lat,
          lng: resp.lng,
          descripcion: resp.descripcion,
          color: `#${resp.color}`,
          fecha: resp.fecha,
          hora: resp.hora,
          ciudadano: `${resp.ciudadano}`,
          foto: `${environment.backendURL}/tipoalerta/mostrar/imagen/${resp.id_tipo}`,
        };
        this.mostrarMarcadores(envioMapa);
      });
    }
  }
  mostrarMarcadores(marcador: AlertaMapa) {
    /* Creando el popup */
    const div = this.renderer2.createElement('div');

    /* Terminando el diseño del marcador */
    const customPopup = new mapboxgl.Popup({
      offset: 25,
      closeOnClick: false,
      maxWidth: '350px',
    }).setDOMContent(div);
    const marker = new mapboxgl.Marker({
      draggable: false,
      color: marcador.color,
    })
      .setLngLat([marcador.lng, marcador.lat])
      .setPopup(customPopup)
      .addTo(this.mapa!);
  }
  funFiltro(data: FiltroForm) {
    const envio: EnvioAlertGet = {
      fechaUno: data.fechaUno,
      fechaDos: data.fechaDos,
      tipoAlerta: data.datoTipo,
    };
    this.alertaService.getAlerta(envio, data.tipo).subscribe(
      (data: ResultAlertas) => {
        //console.log(data);
        this.listAlerta = data.results;
        this.crearMapa();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  generarReporte(event:FiltroForm){
    const envio: EnvioAlertGet = {
      fechaUno: event.fechaUno,
      fechaDos: event.fechaDos,
      tipoAlerta: event.datoTipo,
    };
    this.alertaService.postAlertaReporte(envio,event.tipo).subscribe(
      (data)=>{
        console.log(data);
        window.location.href=`${this.url}/reporte/alertageneral`
        //this.router.navigateByUrl()
      },(error)=>{
        console.log(error);

      }
    )
  }
  buscar() {}
  crearMapa2() {
    this.mapa2 = new mapboxgl.Map({
      container: 'mapa2',
      style: 'mapbox://styles/mapbox/streets-v11',
      accessToken:
        'pk.eyJ1IjoidGlnZXIxMjE0IiwiYSI6ImNrcDd0cDl2NTAzM2syeG1zdzV4NWEwaGIifQ.xYnNZjDu30SiuGKjzgh_jg',
      center: [-74.96366, -8.640309],
      zoom: 15,
    });
  }
  mostrarMapa2() {
    //this.crearMapa2()
  }
  cancelar() {}
}
