import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  kvarovi: any[] = [
    {
      id: 1,
      opstina: 'Cukarica',
      lokacija: 'Kralja 2',
      datumpocetka: '20-2-2020',
      datumkraja: '2-3-2020',
    },
  ];
  dijagol:boolean = false;

  opstine: {
    imeOpstine: string,
    id: number
  }[] = [
    {imeOpstine:'Cukarica',id:1},
    {imeOpstine:'Rakovica',id:2}
  ];

  opstina: any;
  lokacija: string;
  datumpocetka: Date;
  datumkraja: Date;

  constructor() {}

  ngOnInit(): void {}

  prikaziDijalog(){
    this.dijagol = true;
  }

  sakrijDijalog(){
    this.dijagol = false;
  }
}
