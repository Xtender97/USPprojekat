import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cols: any[] = [{
    id: 1,
     opstina: 'Cukarica',
      lokacija: 'Kralja 2',
       datumpocetka: '20-2-2020',
        datumkraja: '2-3-2020'

  }];
  opstine: any[];
  kvarovi: any[];

  constructor() { }

  ngOnInit(): void {
  }

}
