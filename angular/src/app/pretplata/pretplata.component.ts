import { Component, OnInit } from '@angular/core';

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
    {imeOpstine:'Cukarica',id:1},
    {imeOpstine:'Rakovica',id:2}
  ];

  opstina: any;

  constructor() { }

  ngOnInit(): void {
  }

  prijava(){}

}
