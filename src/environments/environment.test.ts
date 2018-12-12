const idTesoreria = '33';
const origen = '928';

const cabecera = {
  ambiente: 'test',
  usuario: '60805000'
};


const urlsBase = {
  publica: 'https://5yi8rce761.execute-api.us-east-1.amazonaws.com/dev/proxy-public',
  privada: 'https://5yi8rce761.execute-api.us-east-1.amazonaws.com/dev/proxy-private',
  elastic: 'https://search-dev-contribuciones-qj3q3jeqbkw5ix5ybdrdlpfqq4.us-east-1.es.amazonaws.com'
};

const pathBase = {
  clienteBienRaiz: '/ClienteBienRaizWS/api/BienRaiz',
  deudaRol: '/RecuperaDeudaROLRS/api/bienraiz',
  bienRaiz: '/BienRaizWS/api/BienRaiz'
};


export const environment = {
  production: false,
  cuentaUrl: 'https://d3l4fqbye5bc5j.cloudfront.net',
  pago: {
    url: 'http://test.tesoreria.cl/ConsultaTipoDeudaWEB/enviaMedioPago'
  },
  cognito: {
    domain: '201811',
    clientId: '42duphe8c9suvm9aice9sm0vtt',
    redirectUri: 'https://dl3ulmxmm6whg.cloudfront.net/login',
    logoutUri: 'https://dl3ulmxmm6whg.cloudfront.net/logout',
    jwtCookieName: 'tgr-jwt',
    expCookieName: 'exp',
    allowCookies: false,
  },
  sizeResultSuggested: 10,
  sizeResultPage: 30,
  certificados: {
    anoDesde: 1955,
  },
  servicios: {
    certificadoDeudas: {
      url: urlsBase.publica,
      path: '/tgrSuscriptorWs/api/suscriptor/certificado/obtener',
      method: 'POST'
    },
    certificadoHistorialPago: {
      url: urlsBase.publica,
      path: '/recaPagoConsultasWS/api/pago/consulta',
      method: 'POST'
    },
    obtenerBienRaizAsociado: {
      url: urlsBase.publica,
      path: pathBase.clienteBienRaiz + '/asociado/obtener',
      method: 'GET'
    },
    obtenerBienRaizNoAsociado: {
      url: urlsBase.publica,
      path: pathBase.clienteBienRaiz + '/noasociado/obtener',
      method: 'GET'
    },
    asociarBienRaiz: {
      url: urlsBase.publica,
      path: pathBase.clienteBienRaiz + '/bienraiz/asociar',
      method: 'POST'
    },
    desasociarBienRaiz: {
      url: urlsBase.publica,
      path: pathBase.clienteBienRaiz + '/bienraiz/desasociar',
      method: 'POST'
    },
    recuperarDeudaRol: {
      url: urlsBase.publica,
      path: pathBase.deudaRol + '/deuda/rol/obtiene',
      method: 'POST'
    },
    buscarBienRaiz: {
      url: urlsBase.publica,
      path: pathBase.bienRaiz + '/bienraiz/obtener/rolin',
      method: 'POST'
    }
  },
  elastic: {
    localidad: {
      url: urlsBase.elastic + '/localidad/_search',
      method: 'POST',
      body: {
        size: 400,
        from: 0
      }
    },
    tiposPropiedades: {
      url: urlsBase.elastic + '/tipo_propiedades/_search',
      method: 'POST',
      body: {
        size: 400,
        from: 0
      }
    },
    propiedades: {
      url: urlsBase.elastic + '/propiedades/_search',
      method: 'POST'
    },
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
