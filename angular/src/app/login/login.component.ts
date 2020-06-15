import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { MessageService } from 'primeng/api'
import { NgForm, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private auth: AuthService,private router: Router) { }

  ngOnInit(): void {
    const loggedIn = this.auth.getInitialStatus();
    if (loggedIn) {
      const user = this.auth.getUser();
      if (user) {
        this.router.navigate([environment.apiUrl + '/dashboard']);
      }
    }
  }

  login() {

    this.auth.login(this.email, this.password);
  }

}
