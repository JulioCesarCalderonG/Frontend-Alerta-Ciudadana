import { Component, ElementRef, OnInit, ViewChild, EventEmitter, Output, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ResultTipoAlerta, ResultTipoAlertas, Tipoalerta } from 'src/app/interface/tipo-alerta';
import { TipoAlertaService } from 'src/app/services/tipo-alerta.service';
import { ToastrService } from 'ngx-toastr';
import { FiltroForm } from 'src/app/interface/search-form';

@Component({
  selector: 'app-search-alerta',
  templateUrl: './search-alerta.component.html',
  styleUrls: ['./search-alerta.component.css']
})

export class SearchAlertaComponent implements OnInit {
  listTipoAlerta?:Array<Tipoalerta>;
  tipo=new FormControl('');
  fechaUnoForm= new FormControl('');
  fechaDosForm= new FormControl('');
  datoTipo=new FormControl('');
 
  @ViewChild('divFecha', { static: false }) divFech?: ElementRef;
  @ViewChild('divTipoAlerta', { static: false }) divTipo?: ElementRef;
  @Output('filtro') filtroEmiter = new EventEmitter<FiltroForm>()
  constructor(private renderer2:Renderer2, private tipoAlertaService:TipoAlertaService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.mostrarTipoAtencion();
      this.tipo.valueChanges.subscribe(value=>{
        const contenedorFecha = this.divFech?.nativeElement;
        const contenedorTipo = this.divTipo?.nativeElement;
        //let resp:boolean;
        switch (value) {
          case '1':
              this.renderer2.setStyle(contenedorFecha,'display','none');
              this.renderer2.setStyle(contenedorTipo,'display','none');
            break;
          case '2':
              this.renderer2.removeStyle(contenedorFecha,'display');
              this.renderer2.setStyle(contenedorTipo,'display','none');
            break;
          case '3':
              this.renderer2.setStyle(contenedorFecha,'display','none');
              this.renderer2.removeStyle(contenedorTipo,'display');
            break;
          default:
            this.renderer2.setStyle(contenedorFecha,'display','none');
            this.renderer2.setStyle(contenedorTipo,'display','none');
            break;
        } 
      });
  }
  onClick(){
    switch (this.tipo.value) {
      case '1':
        this.filtroEmiter.emit({
          fechaDos:this.fechaDosForm.value,
          fechaUno:this.fechaUnoForm.value,
          tipo:this.tipo.value,
          datoTipo:this.datoTipo.value
        });
        break;
      case '2':
          if (this.fechaUnoForm.value !=='' && this.fechaDosForm.value !== '') {
            if (this.fechaUnoForm.value<this.fechaDosForm.value) {
              this.filtroEmiter.emit({
                fechaDos:this.fechaDosForm.value,
                fechaUno:this.fechaUnoForm.value,
                tipo:this.tipo.value,
                datoTipo:this.datoTipo.value
              });
            }else{
              this.toastr.warning('Fecha de inicio debe ser menor a fecha final','Mensaje');
            }
          }else{
            this.toastr.warning('Ingresa las fechas correspondientes','Mensaje');
          }
        break;
      case '3':
          if (this.datoTipo.value !=='') {
            this.filtroEmiter.emit({
              fechaDos:this.fechaDosForm.value,
              fechaUno:this.fechaUnoForm.value,
              tipo:this.tipo.value,
              datoTipo:this.datoTipo.value
            });
          }else{
            this.toastr.warning('Seleccione tipo de alerta para filtrar','Mensaje');
          }
        break;
      default:
        this.toastr.warning('Seleccione un tipo de filtro','Mensaje')
        break;
    }
  }
  mostrarTipoAtencion(){
    this.tipoAlertaService.getTipoAlertas('1').subscribe(
      (data:ResultTipoAlertas)=>{
        this.listTipoAlerta = data.tipoalerta;
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
}
