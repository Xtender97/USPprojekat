export class User {

  ime:string;
  prezime:string;
  email:string;
  sifra:string;
    constructor(
        public id: number,
        public type: string,
        public expirationDate: Date,
        public token: string,
        ) { }
}
