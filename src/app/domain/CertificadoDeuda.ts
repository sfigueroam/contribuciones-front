export class CertificadoDeuda {
  tipo: string;
  titulo: string;
  nombre: string;
  direccion: string;
  comuna: string;
  rut: string;
  rutDv: string;
  tablaDeudas: TablaDeudaRegistro[];
  tablaTotales: TablaTotalesRegistro[];
  fechaEmision: string;
  fechaLiquidacion: string;
  codigoBarras: string;
}

export class TablaDeudaRegistro {
  tipoDeuda: string;
  moneda: string;
  monedaLiq: string;
  tablaFormularios: TablaFormularioRegistro[];
  deudaNeta: string;
  reajustes: string;
  intereses: string;
  multas: string;
  condonacion: string;
  deudaTotal: string;
}

export class TablaFormularioRegistro {
  formCod: string;
  formOrig: string;
  folio: string;
  fechaVcto: string;
  deudaNeta: string;
  reajustes: string;
  intereses: string;
  multas: string;
  condonacion: string;
  deudaTotal: string;
  errCod: string;
  errMsg: string;
}

export class TablaTotalesRegistro {
  tipoDeuda: string;
  moneda: string;
  monedaLiq: string;
  deudaNeta: string;
  reajustes: string;
  intereses: string;
  multas: string;
  condonacion: string;
  deudaTotal: string;
}
