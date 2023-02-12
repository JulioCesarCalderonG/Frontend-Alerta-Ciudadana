import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-serenazgo',
  templateUrl: './serenazgo.component.html',
  styleUrls: ['./serenazgo.component.css']
})
export class SerenazgoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.cargar();
  }
  cargar(){
    if (sessionStorage.getItem('carga')==='0') {
      location.reload();
      sessionStorage.setItem('carga','1');
      //this.desconectarWs();
    }
  }
}
