import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-pretplata',
  templateUrl: './pretplata.component.html',
  styleUrls: ['./pretplata.component.css']
})
export class PretplataComponent implements OnInit {
  opstine: {
    imeOpstine: string,
    id: number
  }[] = [
      { imeOpstine: 'Cukarica', id: 1 },
      { imeOpstine: 'Rakovica', id: 2 }
    ];

  opstina: any;
  baseUrl = environment.apiUrl + '/pretplatnik';
  email: string;
  constructor(private http: HttpClient,
    private msgService: MessageService) { }

  ngOnInit(): void {
    this.opstina = this.opstine[0];
  }

  prijava() {
    console.log(this.opstina.imeOpstine);
    this.http.post(this.baseUrl + '/add', { opstina: this.opstina.imeOpstine, email: this.email }).subscribe(
      (data: { message: string }) => {
        this.msgService.add({ key: 'toast', severity: 'success', summary: "Uspesno ste se prijavili na mejling listu!" });

      }
    );
  }

}
