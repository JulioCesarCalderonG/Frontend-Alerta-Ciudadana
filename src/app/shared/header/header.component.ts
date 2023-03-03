import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  
  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }
  logout(){
    this.loginService.loggoud();
  }
}
