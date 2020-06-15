export class User {

  ime: string;
  prezime: string;
  email: string;
  sifra: string;
  constructor(
    public id: number,
    public expirationDate: Date,
    public token: string,
  ) { }
}
