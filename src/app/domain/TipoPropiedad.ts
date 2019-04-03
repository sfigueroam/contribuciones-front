export class TipoPropiedad {

  id: string;
  descripcion: string;
  order: number;


  public constructor(init?: Partial<TipoPropiedad>) {
    Object.assign(this, init);
  }
}
