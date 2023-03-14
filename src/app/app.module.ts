import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://192.168.0.108:4000', options: {} };

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { ToastrModule } from 'ngx-toastr';
import { AdminGuard } from './guard/admin.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorInterceptor } from './interceptor/interceptor.interceptor';
import { SerenazgoModule } from './serenazgo/serenazgo.module';
import { SerenazgoGuard } from './guard/serenazgo.guard';


@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    AuthModule,
    SerenazgoModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SocketIoModule.forRoot(config)
  ],
  providers: [
    AdminGuard,
    SerenazgoGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
