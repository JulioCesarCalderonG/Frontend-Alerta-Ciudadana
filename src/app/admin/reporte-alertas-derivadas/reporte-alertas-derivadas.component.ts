import { Component, OnInit } from '@angular/core';
import { closeAlert, loadData } from 'src/app/alerts/load';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  selector: 'app-reporte-alertas-derivadas',
  templateUrl: './reporte-alertas-derivadas.component.html',
  styleUrls: ['./reporte-alertas-derivadas.component.css']
})
export class ReporteAlertasDerivadasComponent implements OnInit {

  
     carga:boolean=true;
      constructor(private reportServ:ReportesService) { }
    
      ngOnInit(): void {
      }
    generarReporte() {
    this.carga=false;
    if (!this.carga) {
      loadData('Generando Pdf','Se esta generando el reporte, espere por favor');
    }
      this.reportServ.pdfAlertaDerivada().subscribe((data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
    
        const a = document.createElement('a');
        a.href = url;
        a.download = 'reportealertaderivada.pdf'; // nombre del archivo
        a.click();
    
        window.URL.revokeObjectURL(url); // limpia la URL temporal
        this.carga=true;
        setTimeout(() => {
          if (this.carga) {
            closeAlert();
          }
        }, 1000);
      }, err => {
        console.error('Error al generar PDF:', err);
        this.carga=true;
        setTimeout(() => {
          if (this.carga) {
            closeAlert();
          }
        }, 1000);
      });
    }

}
