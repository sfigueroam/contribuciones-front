export class Direccion {
  id: number;
  comuna: number;
  idComunaSii: number;
  rol: number;
  subRol: number;
  idDestPropiedad: string;
  direccion: string;

  public constructor(init?: Partial<Direccion>) {
    Object.assign(this, init);
    if(init.direccion !== undefined){
      this.direccion = init.direccion.trim();
    }
    // @ts-ignore
    if(init.id_dest_propiedad !== undefined) {
      // @ts-ignore
      this.idDestPropiedad = init.id_dest_propiedad;
    }

    // @ts-ignore
      if(init.id_comuna_sii !== undefined) {
      // @ts-ignore
      this.idComunaSii = init.id_comuna_sii;
    }

  }
}
