import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { NgxPopper } from 'angular-popper';
import { AppBootstrapModule } from './bootstrap/app-bootstrap.module';
import { ClassroomComponent } from './classroom/classroom.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ClassroomComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPopper,
    AppBootstrapModule
  ],
  providers: [
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
