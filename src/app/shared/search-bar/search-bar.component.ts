import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResultUsuarios, Usuario } from 'src/app/interface/usuario';
import { AlertaService } from 'src/app/services/alerta.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertaDerivadaService } from '../../services/alerta-derivada.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  private debounceTimer?:NodeJS.Timeout;
  public isCargaDatos:boolean=false;
  public listUsuario: Usuario[] = [];
  codigoAlerta:number = 0;
  buscar='';
  serenoForm:FormGroup;
  constructor(
    private alertaService:AlertaService,
    private usuarioService: UsuarioService,
    private alertaDerivada:AlertaDerivadaService,
    private fb:FormBuilder
  ) {
    this.serenoForm = this.fb.group({
      sereno:['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.mostrarAlerta();
    this.mostrarSereno();
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
  clickEvent(event:number){
    this.codigoAlerta = event;
  }
  mostrarSereno(){
    this.usuarioService.getSerenazgo().subscribe(
      (resp:ResultUsuarios)=>{

        this.listUsuario = resp.usuario;
        console.log(this.listUsuario);

      }
    )
  }
  derivarAlerta(){
    console.log(this.serenoForm.get('sereno')?.value);
    const formData = new FormData();
    formData.append('id_alerta',String(this.codigoAlerta));
    formData.append('id_usuario',this.serenoForm.get('sereno')?.value);
    this.alertaDerivada.postAlertaDerivada(formData).subscribe(
      (resp)=>{
        console.log(resp);
        Swal.fire(
          'Derivado!',
          'La alerta ha sido derivado con exito, verifica en alertas derivadas!',
          'success'
        )
      },
      (error)=>{
        console.log(error.error.errors[0].msg);
        Swal.fire(
          'Ya derivado!',
          error.error.errors[0].msg,
          'error'
        )

      }
    )
  }
}
