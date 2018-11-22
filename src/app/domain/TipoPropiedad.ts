export class TipoPropiedad {

  id: string;
  descripcion: string;


  public constructor(init?: Partial<TipoPropiedad>) {
    Object.assign(this, init);
  }
}
