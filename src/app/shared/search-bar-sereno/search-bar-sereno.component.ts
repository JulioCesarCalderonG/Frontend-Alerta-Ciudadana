import { Component, OnInit } from '@angular/core';
import { AlertaDerivadaService } from 'src/app/services/alerta-derivada.service';

@Component({
  selector: 'app-search-bar-sereno',
  templateUrl: './search-bar-sereno.component.html',
  styleUrls: ['./search-bar-sereno.component.css']
})
export class SearchBarSerenoComponent implements OnInit {
  private debounceTimer?:NodeJS.Timeout;
  buscar='';
  constructor(
    private alertaService:AlertaDerivadaService
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
    this.alertaService.getAlertaDerivadaSereno(this.buscar);
  }
}
