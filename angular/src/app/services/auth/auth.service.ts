import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/User'
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { MessageService } from 'primeng/api/';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + '/auth';

  user: User = null;

  userLoggedIn: boolean = false;
  userLoggedIn$ = new Subject<User>();

  constructor(private http: HttpClient, private router: Router, private msgService: MessageService) { }

  public getStatus(): Observable<User> {
    return this.userLoggedIn$.asObservable();
  }

  public getUser(): User {
    if (this.user) {
      return this.user;
    }
    else {
      return null;
    }
  }



  getInitialStatus(): boolean { //test if still works when token expires

    console.log('Initializing login information');
    const user: User = this.getAuthData();
    if (!user.token || !user.id || !user.expirationDate) {
      return false;
    }
    const notExpired = user.expirationDate.getTime() - Date.now() > 0;
    if (notExpired) {
      console.log('not expired');
      this.userLoggedIn = true;
      this.user = user;
      return true;
    }
    else {
      this.inteceptorLogOut();
      return false;
    }

  }



  login(email: string, password: string) {
    this.msgService.clear();
    const credentials = {
      email: email,
      sifra: password
    };
    this.http.post<{ message: string, token: string, expiresIn: number, userID: number, type: string }>(this.baseUrl + '/login', credentials).subscribe
      (response => {
        const expirationDate = new Date(
          Date.now() + response.expiresIn * 1000
        );
        console.log(expirationDate);
        // check if u got the token from the back end
        this.userLoggedIn = true;
        this.user = new User(response.userID, expirationDate, response.token);
        this.userLoggedIn$.next(this.user);
        this.saveAuthData(this.user);
        this.router.navigate(['dashboard']);
      },
        err => {
          console.log(err);
          this.msgService.clear();
          this.msgService.add({ severity: 'error', summary: err.error.message });

        })
  }

  loguot() {
    this.clearAuthData();
    this.userLoggedIn = false;
    this.userLoggedIn$.next(null);
    this.user = null;
    this.router.navigate([""]);
    this.msgService.add({ key: 'toast', severity: 'success', summary: 'Successfully signed out!' })
  }

  inteceptorLogOut() {
    console.log("Interceptor log out");
    this.clearAuthData();
    this.userLoggedIn = false;
    this.userLoggedIn$.next(null);
    this.user = null;
    this.router.navigate([""]);
    this.msgService.add({  severity: 'error', summary: 'Last time signed in 12h ago. Your session expired. Please sing in again.' })
  }

  registerUser(firstName: string,
    lastName: string,
    email: string,
    password: string) {
    const user = {
      ime: firstName,
      prezime: lastName,
      email: email,
      sifra: password
    };

    this.http.post(this.baseUrl + '/register', user).subscribe((data: { message: string }) => {
      console.log(data);
      this.router.navigate(['/login']);
      this.msgService.add({ key: 'toast', severity: 'success', summary: data.message })
    },
      err => {
        console.log('*************ERROR*************');
        console.log(err);
        this.msgService.clear();
        this.msgService.add({ severity: 'error', summary: err.error.message });
      })
  }

  private saveAuthData(user: User) {
    localStorage.setItem("token", user.token);
    localStorage.setItem("expiration", user.expirationDate.toISOString());
    localStorage.setItem("userId", user.id.toString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
    localStorage.removeItem("type");
  }
  private getAuthData(): User {
    return new User(
      +localStorage.getItem("userId"),
      new Date(localStorage.getItem("expiration")),
      localStorage.getItem("token"))
  }

}
