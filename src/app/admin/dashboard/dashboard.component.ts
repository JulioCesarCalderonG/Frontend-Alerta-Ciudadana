import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { GraficaService } from 'src/app/services/grafica.service';
import { WebsocketService } from 'src/app/socket/websocket.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {
  lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40,59, 80, 81, 56, 55, 40], label: 'Product A' }
  ];
  //Labels shown on the x-axis
  lineChartLabels: Label[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre'];
  lineAlertaTotal: ChartDataSets[] = [
    { data: [65], label: 'Product A' }
  ];
  lineAlertaLabels: Label[] = ['Total'];
  // Alerta Gnerada
  lineAlertaGeneradaData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40,59, 80, 81, 56, 55, 40], label: 'Product A' }
  ];
  //Labels shown on the x-axis
  lineAlertaGeneradaLabels: Label[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre'];
  lineAlertaGeneradaTotal: ChartDataSets[] = [
    { data: [65], label: 'Product A' }
  ];
  lineAlertaGeneradaTotalLabels: Label[] = ['Total'];
  constructor(
    private graficaService:GraficaService,
    private wsService:WebsocketService
  ) { }

  ngOnInit(): void {
    this.mostrarAlerta();
    this.mostrarAlertaTotal();
    this.mostrarAlertaGenerada();
    this.mostrarAlertaGeneradaTotal();
    this.socketAlerta();
    this.socketAlertaRegistrada();
  }
  mostrarAlerta(){
    this.graficaService.getAlertas().subscribe(
      (data)=>{
        this.lineChartData= data
      },(error)=>{
        console.log(error);

      }
    )
  }
  mostrarAlertaTotal(){
    this.graficaService.getAlertasTotal().subscribe(
      (data)=>{
        this.lineAlertaTotal= data
      },(error)=>{
        console.log(error);

      }
    )
  }
  mostrarAlertaGenerada(){
    this.graficaService.getAlertasGenerada().subscribe(
      (data)=>{
        this.lineAlertaGeneradaData= data
      },(error)=>{
        console.log(error);

      }
    )
  }
  mostrarAlertaGeneradaTotal(){
    this.graficaService.getAlertasGeneradaTotal().subscribe(
      (data)=>{
        this.lineAlertaGeneradaTotal= data
      },(error)=>{
        console.log(error);

      }
    )
  }
  socketAlerta(){
    this.wsService.listen('actualizar-alerta-general').subscribe(
      (data) => {
       this.mostrarAlerta();
       this.mostrarAlertaTotal();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  socketAlertaRegistrada(){
    this.wsService.listen('registrar-alerta-generada').subscribe(
      (data)=>{
        this.mostrarAlertaGenerada();
        this.mostrarAlertaGeneradaTotal();
      },
      (error)=>{
        console.log(error);

      }
    )
  }
}
