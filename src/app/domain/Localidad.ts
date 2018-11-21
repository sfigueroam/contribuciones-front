export class Localidad {
  id: number;
  idSii: number;
  comuna: string;
  provincia: string;
  region: string;


  public constructor(init?: Partial<Localidad>) {
    Object.assign(this, init);
    this.idSii = init.id_sii;
  }
}
