import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from '../models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  authenticated: boolean = false;//pazi na ovo
  sub: Subscription;
  user: User = new User(null, null, null);

  isDispatcher: boolean;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authenticated = this.auth.getInitialStatus();
    this.user = this.auth.getUser();
    if (!this.user) {
      this.user = new User(null, null, null);
    }

    this.sub = this.auth.getStatus().subscribe(user => {
      if (user) {
        this.authenticated = true;
        this.user = user;

      }
      else {
        console.log("izlogovan");
        this.authenticated = false;
        this.user = new User(null, null, null);

      }
    },
      err => {
        this.authenticated = false;
      });


  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  logout() {

    this.auth.loguot();

  }

  login(){
    this.router.navigate(['/login']);
  }
  register(){
    this.router.navigate(['/registration']);

  }
}
