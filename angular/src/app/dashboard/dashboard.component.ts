import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  baseUrl = environment.apiUrl + '/kvar';

  kvarovi: {
    id: number,
    opstina: string,
    lokacija: string,
    datumpocetka: Date,
    datumkraja: Date,
  }[];

  opstine: {
    imeOpstine: string,
    id: number
  }[] = [
      { imeOpstine: 'Cukarica', id: 1 },
      { imeOpstine: 'Rakovica', id: 2 }
    ];

  opstina: any;
  lokacija: string;
  datumpocetka: Date;
  datumkraja: Date;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(this.baseUrl + "/get").subscribe((data: { data: any[] }) => {
      this.kvarovi = data.data;
    })
  }

  prikaziDijalog() {
    this.router.navigate(['kvar']);
  }

}
