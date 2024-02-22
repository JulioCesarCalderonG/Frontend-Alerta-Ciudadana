import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { MinimizarService } from 'src/app/services/minimizar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.css'
  ]
})
export class HeaderComponent implements OnInit {

  estado?:boolean;
  @Output('minimizar') minimizarEmiter = new EventEmitter<boolean>()
  constructor(
    private loginService: LoginService,
    private minimizarService:MinimizarService
  ) { 
    this.minimizarService.minimizarCurrent.subscribe((event)=>{
      this.estado=event;
    })
  }

  ngOnInit(): void {
  }
  logout(){
    this.loginService.loggoud();
  }
  minimizar(){
    this.estado=!this.estado;
    this.minimizarService.changeMinimizar(this.estado);

  }
}
