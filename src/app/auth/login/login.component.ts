import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResultLogin } from 'src/app/interface/login';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  dataLogin: FormGroup;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.dataLogin = this.fb.group({
      dni: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
  login() {
    const formData = new FormData();
    formData.append('dni',this.dataLogin.get('dni')?.value);
    formData.append('password',this.dataLogin.get('password')?.value);
    this.loginService.login(formData).subscribe(
      (data:ResultLogin)=>{
       console.log(data);
       if (data.ok === false) {
        console.log(data.msg);
        this.toastr.warning(data.msg, 'Mensaje');
       }else if(data.ok===true){
        console.log(data);
        sessionStorage.setItem('carga','0');
        sessionStorage.setItem('x-token', data.token);  
        sessionStorage.setItem('usuario', data.usuario.nombre);
        sessionStorage.setItem('rol', String(data.usuario.id_cargo));
        if (data.usuario.Cargo.cargo==='UN') {
          this.router.navigateByUrl('/normal');
         }
        if (data.usuario.Cargo.cargo==='UA') {
          this.router.navigateByUrl('/admin');
         }
       }
      },
      (error)=>{
        console.log(error);
      }
    )
  }
}
