import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  authenticated: boolean = false;



  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(){
    this.router.navigate(['/login']);
  }

  logout(){
    this.router.navigate([environment.apiUrl + 'login']);
  }

}
