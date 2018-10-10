export class Dammy {

  bienRaiz: any = {
    'curout': [
      {
        'comuna': 'PUDAHUEL',
        'destPropiedad': 'SITIO ERIAZO',
        'dirPostal': 'PANAMERICANA NORTE  5291                ',
        'dirPredial': 'AV A VESPUCIO OTE   1345                ',
        'direccion': 'AV A VESPUCIO OTE   1345                ',
        'idComuna': 13111,
        'idDestPropiedad': 'W',
        'rol': 8201011034,
        'rolComunaSiiCod': 82,
        'rolId': 1011,
        'subrolId': 34
      }
    ]
  };

  deudasRol: any = {
    'listaDeudaRol': [
      {
        'clasificacion': 'S',
        'codigoBarra': '10100500032918103103013512',
        'condonacion': 65,
        'fechaVencimiento': '30-04-2011',
        'folio': '821011111',
        'interes': 720367,
        'montoCondonacion': 468239,
        'multa': 0,
        'nroRol': 8201011034,
        'numeroCuota': '1-2011',
        'reajuste': 113774,
        'saldoOriginal': 419831,
        'saldoPesos': 785733,
        'tipoDeuda': '2'
      },
      {
        'clasificacion': 'S',
        'codigoBarra': '10100500033018103103010212',
        'condonacion': 65,
        'fechaVencimiento': '30-06-2011',
        'folio': '821011211',
        'interes': 696600,
        'montoCondonacion': 452790,
        'multa': 0,
        'nroRol': 8201011034,
        'numeroCuota': '2-2011',
        'reajuste': 107897,
        'saldoOriginal': 419831,
        'saldoPesos': 771538,
        'tipoDeuda': '2'
      },
      {
        'clasificacion': 'S',
        'codigoBarra': '10100500033118103103015610',
        'condonacion': 65,
        'fechaVencimiento': '30-09-2009',
        'folio': '821011309',
        'interes': 706761,
        'montoCondonacion': 459395,
        'multa': 0,
        'nroRol': 8201011034,
        'numeroCuota': '3-2009',
        'reajuste': 103047,
        'saldoOriginal': 329223,
        'saldoPesos': 679636,
        'tipoDeuda': '2'
      },
      {
        'clasificacion': 'S',
        'codigoBarra': '10100500033218103103013712',
        'condonacion': 65,
        'fechaVencimiento': '30-11-2009',
        'folio': '821011409',
        'interes': 689566,
        'montoCondonacion': 448218,
        'multa': 0,
        'nroRol': 8201011034,
        'numeroCuota': '4-2009',
        'reajuste': 100413,
        'saldoOriginal': 329223,
        'saldoPesos': 670984,
        'tipoDeuda': '2'
      }
    ],
    'resultadoWs': {
      'mensaje': 'Se obtuvo la Lista de Deudas correctamente',
      'status': 'OK'
    }
  };

  public getBienRaiz(): any {
    return this.bienRaiz;
  }

}
