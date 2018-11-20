export class Localidad {
  id: number;
  comuna: string;
  provincia: string;
  region: string;


  public constructor(init?: Partial<Localidad>) {
    Object.assign(this, init);
  }
}
