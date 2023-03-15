import { Component, OnInit, Renderer2 } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { CentroAtencion, ResultCentroAtencion, ResultCentroAtenciones } from 'src/app/interface/centro-atencion';
import { CentroForm } from 'src/app/interface/centro-atencion.form';
import { Centro, Lugar } from 'src/app/interface/lugar';
import { CentroAtencionService } from 'src/app/services/centro-atencion.service';
import { TipoAtencionService } from 'src/app/services/tipo-atencion.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { TipoAtencion, ResultTipoAtenciones } from 'src/app/interface/tipo.atencion';
@Component({
  selector: 'app-centro-ciudadano',
  templateUrl: './centro-ciudadano.component.html',
  styleUrls: ['./centro-ciudadano.component.css']
})
export class CentroCiudadanoComponent implements OnInit {
  estado: string = '1';
  mapa?: mapboxgl.Map;
  centroForm: CentroForm = {
    celular: '',
    direccion: '',
    lat: 0,
    lng: 0,
    telefono: '',
    tipoAtencion: '',
    titulo: ''
  };
  markersMapbox: { [id: string]: mapboxgl.Marker } = {};
  listCentro?: Array<CentroAtencion>;
  listTipo?: Array<TipoAtencion>
  ids?: number;
  constructor(private renderer2: Renderer2, private centroAtencionService: CentroAtencionService, private tipoAtencionService: TipoAtencionService) { }

  ngOnInit(): void {
    //this.crearMapa();
    this.mostrarCentros();
    this.mostrarTipodeAtencion();
  }
  mostrarCentros() {
    this.centroAtencionService.getCentroAtenciones(this.estado).subscribe(
      (data: ResultCentroAtenciones) => {
        this.listCentro = data.centroAtencion;
        this.crearMapa();
      },
      (error) => {
        console.log(error);

      }
    )
  }
  mostrarTipodeAtencion() {
    this.tipoAtencionService.getTiposAtencion('1').subscribe(
      (data: ResultTipoAtenciones) => {
        this.listTipo = data.tipoAtencion;
      },
      (error) => {
        console.log(error);

      }
    )
  }
  crearMapa() {
    this.mapa = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      accessToken: 'pk.eyJ1IjoidGlnZXIxMjE0IiwiYSI6ImNrcDd0cDl2NTAzM2syeG1zdzV4NWEwaGIifQ.xYnNZjDu30SiuGKjzgh_jg',
      center: [-74.569187, -8.389846],
      zoom: 12
    });
    this.listCentro?.map((resp) => {
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
    });
  }
  mostrarMarcadores(marcador: Centro) {

    /* Creando el popup */
    const div = this.renderer2.createElement('div');
    this.renderer2.addClass(div, 'form-group');
    this.renderer2.setStyle(div, 'width', '100%')
    /* Creamos el titulo */
    const h4 = this.renderer2.createElement('h4');
    this.renderer2.addClass(h4, 'card-title');
    const titulo = this.renderer2.createText(marcador.titulo);
    this.renderer2.appendChild(h4, titulo);
    this.renderer2.appendChild(div, h4)
    /* Creamos la direccion */
    const direccion = this.renderer2.createElement('h6');
    this.renderer2.addClass(direccion, 'card-subtitle');
    const nombreDir = this.renderer2.createText(`Direccion: ${marcador.direccion}`);
    this.renderer2.appendChild(direccion, nombreDir);
    this.renderer2.appendChild(div, direccion);
    /* Creamos el celular */
    const celular = this.renderer2.createElement('h6');
    this.renderer2.addClass(celular, 'card-subtitle');
    const numCelular = this.renderer2.createText(`Celular: ${marcador.celular}`);
    this.renderer2.appendChild(celular, numCelular);
    this.renderer2.appendChild(div, celular);
    /* Creamos el telefono */
    const telefono = this.renderer2.createElement('h6');
    this.renderer2.addClass(telefono, 'card-subtitle');
    const numTelefono = this.renderer2.createText(`Telefono: ${marcador.telefono}`);
    this.renderer2.appendChild(telefono, numTelefono);
    this.renderer2.appendChild(div, telefono);
    /* Creamos el boton borrar */
    const buttonCancelar = this.renderer2.createElement('button');
    this.renderer2.addClass(buttonCancelar, 'ml-3')
    this.renderer2.setAttribute(buttonCancelar, 'type', 'button');
    this.renderer2.addClass(buttonCancelar, 'btn');
    this.renderer2.addClass(buttonCancelar, 'waves-effect');
    this.renderer2.addClass(buttonCancelar, 'waves-light');
    this.renderer2.addClass(buttonCancelar, 'btn-danger');
    const textCancelar = this.renderer2.createText('Eliminar Centro');
    this.renderer2.appendChild(buttonCancelar, textCancelar);
    this.renderer2.appendChild(div, buttonCancelar);
    /* Creando el diseño del marcador */
    const divImg = this.renderer2.createElement('div');
    this.renderer2.addClass(divImg, 'marker');
    this.renderer2.setStyle(divImg, 'background-image', `url(${marcador.img})`);
    /* Terminando el diseño del marcador */
    const customPopup = new mapboxgl.Popup({
      offset: 25,
      closeOnClick: false,
      maxWidth: '350px'
    }).setDOMContent(div);
    const marker = new mapboxgl.Marker(divImg)
      .setLngLat([marcador.lng, marcador.lat])
      .setPopup(customPopup)
      .addTo(this.mapa!)

    marker.on('drag', () => {
      const lngLat = marker.getLngLat();
      this.centroForm.lat = lngLat.lat;
      this.centroForm.lng = lngLat.lng;

      //TODO: Crear evento para emitir las coordenadas de este marcador
      const nuevoMarcador = {
        id: marcador.id,
        ...lngLat
      };

    });
    this.renderer2.listen(buttonCancelar, 'click', () => {
      Swal.fire({
        title: 'Estas seguro?',
        text:
          marcador.estado === '0'
            ? 'Esta tipo de atencion sera desbloqueado!!!'
            : 'Esta tipo de atencion sera Eliminado!!!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: marcador.estado === '0' ? 'Si, Eliminar!' : 'Si, Eliminar!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.centroAtencionService.deleteCentroAtencion(marcador.id, '0').subscribe(
            (data) => {
              console.log(data);
              this.mostrarCentros();
            },
            (error) => {
              console.log(error);

            }
          )
        }
      });
    });
  }
  agregarMarcador(marcador: Lugar) {
    const div = this.renderer2.createElement('div');
    this.renderer2.addClass(div, 'form-group');
    this.renderer2.setStyle(div, 'width', '100%')
    /* Creamos el titulo */
    const h4 = this.renderer2.createElement('h4');
    this.renderer2.addClass(h4, 'card-title');
    const titulo = this.renderer2.createText('Registra un centro de atencion');
    this.renderer2.appendChild(h4, titulo);
    this.renderer2.appendChild(div, h4)
    /* Creamos el subtitulo */
    const h6 = this.renderer2.createElement('h6');
    this.renderer2.addClass(h6, 'card-subtitle');
    const subtitulo = this.renderer2.createText('Da click en el boton registrar, para crear un centro de atencion');
    this.renderer2.appendChild(h6, subtitulo);
    this.renderer2.appendChild(div, h6)
    /* Creamos el boton guardar */
    const buttonGuardar = this.renderer2.createElement('button');
    this.renderer2.setAttribute(buttonGuardar, 'type', 'button');
    this.renderer2.setAttribute(buttonGuardar, 'data-toggle', 'modal');
    this.renderer2.setAttribute(buttonGuardar, 'data-target', '#exampleModal');
    this.renderer2.addClass(buttonGuardar, 'btn');
    this.renderer2.addClass(buttonGuardar, 'waves-effect');
    this.renderer2.addClass(buttonGuardar, 'waves-light');
    this.renderer2.addClass(buttonGuardar, 'btn-success');
    const textGuardar = this.renderer2.createText('Crear Centro');
    this.renderer2.appendChild(buttonGuardar, textGuardar);
    this.renderer2.appendChild(div, buttonGuardar);

    /* Creamos el boton borrar */
    const buttonCancelar = this.renderer2.createElement('button');
    this.renderer2.addClass(buttonCancelar, 'ml-3')
    this.renderer2.setAttribute(buttonCancelar, 'type', 'button');
    this.renderer2.addClass(buttonCancelar, 'btn');
    this.renderer2.addClass(buttonCancelar, 'waves-effect');
    this.renderer2.addClass(buttonCancelar, 'waves-light');
    this.renderer2.addClass(buttonCancelar, 'btn-danger');
    const textCancelar = this.renderer2.createText('Cancelar');
    this.renderer2.appendChild(buttonCancelar, textCancelar);
    this.renderer2.appendChild(div, buttonCancelar);
    const customPopup2 = new mapboxgl.Popup({
      offset: 25,
      closeOnClick: false,
      maxWidth: '350px'
    }).setDOMContent(div);
    const marker2 = new mapboxgl.Marker({
      draggable: true,
      color: marcador.color,
    })
      .setLngLat([marcador.lng, marcador.lat])
      .setPopup(customPopup2)
      .addTo(this.mapa!)

    marker2.on('drag', () => {
      const lngLat = marker2.getLngLat();
      this.centroForm.lat = lngLat.lat;
      this.centroForm.lng = lngLat.lng;

      //TODO: Crear evento para emitir las coordenadas de este marcador
      const nuevoMarcador = {
        id: marcador.id,
        ...lngLat
      };

    });
    //this.markersMapbox[marcador.id] = marker;
    this.renderer2.listen(buttonCancelar, 'click', () => {
      marker2.remove();
    });
  }
  crearEditarCentro() {
    const formData = new FormData();
    formData.append('titulo', this.centroForm.titulo);
    formData.append('lat', `${this.centroForm.lat}`);
    formData.append('lng', `${this.centroForm.lng}`);
    formData.append('direccion', this.centroForm.direccion);
    formData.append('celular', this.centroForm.celular);
    formData.append('telefono', this.centroForm.telefono);
    formData.append('id_tipo_atencion', this.centroForm.tipoAtencion);
    this.centroAtencionService.postCentroAtencion(formData).subscribe(
      (data) => {
        this.centroForm.celular = '';
        this.centroForm.direccion = '';
        this.centroForm.telefono = '';
        this.centroForm.tipoAtencion = '';
        this.centroForm.titulo = '';
        this.mostrarCentros();
      },
      (error) => {
        console.log(error);

      }
    )
  }

  crearMarcador() {
    const customMarker: Lugar = {
      id: new Date().toISOString(),
      lng: -74.532924,
      lat: -8.360678,
      nombre: 'julio cesar calderon galindo',
      vehiculo: 'vehiculo 3',
      color: '#' + Math.floor(Math.random() * 16777215).toString(16)
    }
    this.agregarMarcador(customMarker);
  }
  cancelar() {
    this.centroForm.celular = '';
    this.centroForm.direccion = '';
    this.centroForm.telefono = '';
    this.centroForm.tipoAtencion = '';
    this.centroForm.titulo = '';
    this.ids = undefined;
  }
}
