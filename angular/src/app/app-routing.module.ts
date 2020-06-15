import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PretplataComponent } from './pretplata/pretplata.component';


const routes: Routes = [
  //{ path: 'dashboard', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegisterComponent },
  { path: '', component: PretplataComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
