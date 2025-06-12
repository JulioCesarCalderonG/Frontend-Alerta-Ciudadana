import { Component, OnInit } from '@angular/core';
import { Resp, ResultControlPersonal } from 'src/app/interface/control-personal';
import { ControlPersonalService } from 'src/app/services/control-personal.service';

@Component({
  selector: 'app-control-personal',
  templateUrl: './control-personal.component.html',
  styleUrls: ['./control-personal.component.css']
})
export class ControlPersonalComponent implements OnInit {

  listControlPersonal?:Resp[];
  p: number = 1;
  constructor(
    private controlPersonalService:ControlPersonalService
  ) { }

  ngOnInit(): void {
    this.mostrarPersonal();
  }
  mostrarPersonal(){
    this.controlPersonalService.getControlPersonal().subscribe(
      (data:ResultControlPersonal)=>{        
        this.listControlPersonal = data.resp;
      },(error)=>{
        console.log(error);
        
      }
    )
  }
}
