import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-kvar',
  templateUrl: './kvar.component.html',
  styleUrls: ['./kvar.component.css']
})
export class KvarComponent implements OnInit {
  opstine: {
    imeOpstine: string,
    id: number
  }[] = [
      { imeOpstine: 'Opstina1', id: 1 },
      { imeOpstine: 'Opstina2', id: 2 },
      { imeOpstine: 'Opstina3', id: 3 },

      { imeOpstine: 'Opstina4', id: 4 }

    ];

  baseUrl = environment.apiUrl + '/kvar';


  opstina: any;
  lokacija: string;
  datumpocetka: Date;
  datumkraja: Date;

  constructor(private http: HttpClient, private router: Router, private msgService: MessageService) { }

  ngOnInit(): void {
    this.opstina = this.opstine[0];
  }
  dodaj() {
    this.http.post(this.baseUrl + '/add', {
      opstina: this.opstina.imeOpstine,
      lokacija: this.lokacija,
      datumkraja: this.datumkraja,
      datumpocetka: this.datumpocetka
    }).subscribe(
      (data: { message: string }) => {
        this.msgService.add({ key: 'toast', severity: 'success', summary: "Uspesno ste dodali novi kvar!" });
        this.router.navigate(['/dashboard']);
      }
    )
  }

}
