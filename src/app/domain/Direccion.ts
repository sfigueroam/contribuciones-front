export class Direccion {
  id: number;
  idComuna: number;
  descripcionComuna: string;
  idComunaSii: number;
  rol: number;
  subrol: number;
  idDestPropiedad: string;
  descripcionPropiedad: string;
  direccion: string;
  direccionOriginal: string;

  public constructor(init?: Partial<Direccion>) {
    Object.assign(this, init);
    if (init.direccion !== undefined) {
      this.direccion = init.direccion.trim();
    }
    // @ts-ignore
    if (init.id_dest_propiedad !== undefined) {
      // @ts-ignore
      this.idDestPropiedad = init.id_dest_propiedad;
    }

    // @ts-ignore
    if (init.id_comuna_sii !== undefined) {
      // @ts-ignore
      this.idComunaSii = init.id_comuna_sii;
    }
    // @ts-ignore
    if (init.descripcion_comuna !== undefined) {
      // @ts-ignore
      this.descripcionComuna = init.descripcion_comuna;
    }
    // @ts-ignore
    if (init.descripcion_propiedad !== undefined) {
      // @ts-ignore
      this.descripcionPropiedad = init.descripcion_propiedad;
    }
    // @ts-ignore
    if (init.id_comuna !== undefined) {
      // @ts-ignore
      this.idComuna = init.id_comuna;
    }
    // @ts-ignore
    if (init.direccion_simple !== undefined) {
      // @ts-ignore
      this.direccionOriginal = init.direccion_simple.trim();
    }

  }
}
