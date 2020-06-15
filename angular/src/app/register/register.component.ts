import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
//import { UserService } from '../services/user/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public ime: string;
  prezime: string;
  email: string;
  sifra: string;

  id;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    //private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.init();
      }
    });
  }

  init() {
    /*this.userService
      .getUserById(this.id)
      .subscribe(
        (data: {
          message: String;
          data: {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
            type: string;
          };
        }) => {
          console.log(data);

          this.firstName = data.data.firstName;
          this.lastName = data.data.lastName;
          this.email = data.data.email;
          this.password = data.data.password;
        }
      );*/
  }

  register() {
    this.auth.registerUser(this.ime, this.prezime, this.email, this.sifra);
  }
}
