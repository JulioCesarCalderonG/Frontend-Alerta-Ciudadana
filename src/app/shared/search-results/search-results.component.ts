import { Component, OnInit } from '@angular/core';
import { Alerta, AlertaFiltrada } from 'src/app/interface/alerta-filtrada';
import { AlertaService } from 'src/app/services/alerta.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  
  constructor(
    
  ) { }

  ngOnInit(): void {
  }
  
}
