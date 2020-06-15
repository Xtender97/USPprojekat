import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DropdownModule} from 'primeng/dropdown'
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { DashboardComponent } from './dashboard/dashboard.component';
import { InputTextModule } from 'primeng/inputtext';
import { PretplataComponent } from './pretplata/pretplata.component';
import {ToastModule } from 'primeng/toast'


@NgModule({

  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    PretplataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MessagesModule,
    MessageModule,
    CardModule,
    ButtonModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    DropdownModule,
    BrowserAnimationsModule,
    ToastModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
