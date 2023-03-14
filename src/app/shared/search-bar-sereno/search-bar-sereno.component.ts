import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AlertaDerivadaService } from 'src/app/services/alerta-derivada.service';
import { WebsocketService } from 'src/app/socket/websocket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-bar-sereno',
  templateUrl: './search-bar-sereno.component.html',
  styleUrls: ['./search-bar-sereno.component.css']
})
export class SearchBarSerenoComponent implements OnInit {
  private debounceTimer?:NodeJS.Timeout;
  buscar='';
  constructor(
    private alertaService:AlertaDerivadaService,
    private ws:WebsocketService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.mostrarAlerta();
    this.alertaSocket();
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
  actualizarAlerta(event:any){
    console.log(event);
    const formData = new FormData();
    formData.append('atencion','1');
    Swal.fire({
      title: 'Estas seguro?',
      text: "Esta alerta sera atendido!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, atender!',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.alertaService.putAlertaDerivada(formData, event).subscribe(
          resp=>{
            Swal.fire(
              'Atendido!',
              'La alerta ha sido atendido con exito',
              'success'
            )
            this.mostrarAlerta();
          }
        )
        
      }
    })
  }
  alertaSocket(){
    const id = sessionStorage.getItem('id_usuario');
    this.ws.listen(`alerta-derivada-${id}`).subscribe(
      (data:any)=>{
        this.toastr.success(
          data.titulo,
          data.msg
        );   
        this.mostrarAlerta();   
      }
    )
  }
}
