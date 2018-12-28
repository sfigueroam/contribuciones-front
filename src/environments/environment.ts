const urlsBase = {
  publica: 'https://5yi8rce761.execute-api.us-east-1.amazonaws.com/dev/proxy-public',
  privada: 'https://5yi8rce761.execute-api.us-east-1.amazonaws.com/dev/proxy-private',
  elastic: 'https://w2jmtnip5c.execute-api.us-east-1.amazonaws.com/dev'
};

const pathBase = {
  clienteBienRaiz: '/ClienteBienRaizWS/api/BienRaiz',
  deudaRol: '/RecuperaDeudaROLRS/api/bienraiz',
  bienRaiz: '/BienRaizWS/api/BienRaiz'
};


export const environment = {
  snackbarTime: 5000,
  production: false,
  cuentaUrl: 'https://201811.auth.us-east-1.amazoncognito.com/login?response_type=token&client_id=14f89jhmsbv982dhcuf2jijcgu&redirect_uri=http://localhost:4200/login',
  pago: {
    url: 'http://test.tesoreria.cl/ConsultaTipoDeudaWEB/enviaMedioPago'
  },
  cognito: {
    domain: '201811',
    clientId: '2ntpfu2jj8miueillfdef8i93n',
    redirectUri: 'http://localhost:4300/login',
    logoutUri: 'http://localhost:4300/logout',
    jwtCookieName: 'tgr-jwt',
    expCookieName: 'exp',
    allowCookies: true,
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
      url: urlsBase.privada,
      path: pathBase.clienteBienRaiz + '/asociado/obtener',
      method: 'GET'
    },
    obtenerBienRaizNoAsociado: {
      url: urlsBase.privada,
      path: pathBase.clienteBienRaiz + '/noasociado/obtener',
      method: 'GET'
    },
    asociarBienRaiz: {
      url: urlsBase.privada,
      path: pathBase.clienteBienRaiz + '/bienraiz/asociar',
      method: 'POST'
    },
    desasociarBienRaiz: {
      url: urlsBase.privada,
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
      url: urlsBase.elastic + '/search/localidad',
      method: 'POST',
      body: {
        size: 400,
        from: 0
      }
    },
    tiposPropiedades: {
      url: urlsBase.elastic + '/search/tipo_propiedad',
      method: 'POST',
      body: {
        size: 400,
        from: 0
      }
    },
    propiedades: {
      url: urlsBase.elastic + '/search/propiedad',
      method: 'POST'
    },
  }
};
