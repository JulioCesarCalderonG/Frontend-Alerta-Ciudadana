import { Component, OnInit } from '@angular/core';
import { Alerta, AlertaFiltrada } from 'src/app/interface/alerta-filtrada';
import { AlertaService } from 'src/app/services/alerta.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  private debounceTimer?:NodeJS.Timeout;
  
  buscar=''
  constructor(
    private alertaService:AlertaService
  ) { }

  ngOnInit(): void {
    this.mostrarAlerta();
  }
  onQueryChanged(query:string=''){
    if(this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer=setTimeout(() => {
      this.buscar = query;
      this.mostrarAlerta();

    }, 350);
  }
  mostrarAlerta(){
    this.alertaService.getFiltroAlerta(this.buscar);
  }
}
