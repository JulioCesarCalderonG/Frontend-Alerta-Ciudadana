import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Alerta } from 'src/app/interface/alerta';
import { AlertaService } from 'src/app/services/alerta.service';
@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit {
  mapa?: mapboxgl.Map;
  listAlerta?:Array<Alerta>;
  constructor(private alertaService:AlertaService) { }

  ngOnInit(): void {
    this.crearMapa();
    this.mostrarAlerta();
  }
  crearMapa() {
    this.mapa = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      accessToken: 'pk.eyJ1IjoidGlnZXIxMjE0IiwiYSI6ImNrcDd0cDl2NTAzM2syeG1zdzV4NWEwaGIifQ.xYnNZjDu30SiuGKjzgh_jg',
      center: [-74.569187, -8.389846],
      zoom: 12
    });
    /* this.listCentro?.map((resp) => {
      const marcador: Centro = {
        celular: resp.celular,
        direccion: resp.direccion,
        id: resp.id,
        lat: Number(resp.lat),
        lng: Number(resp.lng),
        nombre: resp.TipoAtencion.nombre,
        telefono: resp.telefono,
        img: `${environment.backendURL}/uploadgeneral/tipo-atencion/${resp.id_tipo_atencion}`,
        estado: `${resp.estado}`,
        titulo: resp.titulo
      }
      this.mostrarMarcadores(marcador);
    }); */
  }
  mostrarAlerta(){
    this.alertaService.getAlerta().subscribe(
      (data)=>{
        console.log(data);
        
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
  funFiltro(data:any){
    console.log(data);
    
  }
}
