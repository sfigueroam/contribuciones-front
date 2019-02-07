const endpoints = {
  publica: '__ENDPOINT_PUBLICA__',
  privada: '__ENDPOINT_PRIVADA__',
  //privada: 'https://u3aeivcwv0.execute-api.us-east-1.amazonaws.com/dev',
  lambdaRoles: '__ENDPOINT_ROLES__',
  //lambdaRoles: 'https://86w4nv3zfa.execute-api.us-east-1.amazonaws.com/dev',
  elastic: '__ENDPOINT_ELASTICSEARCH__',
};

const urlsBase = {
  publica: endpoints.publica + '/proxy-public',
  privada: endpoints.privada + '/proxy-private',
  elastic: endpoints.elastic,
  lambdaRoles: endpoints.lambdaRoles + '/roles'
};

const id = {
  //authorizeURL: "https://201811.auth.us-east-1.amazoncognito.com/oauth2/authorize",
  authorizeURL: "__COGNITO_URL_AUTHORIZE__",
  //clientId: "14f89jhmsbv982dhcuf2jijcgu",
  clientId: "__COGNITO_CLIENT_ID_1__",
  //redirectURI: "http://localhost:4200/login"
  redirectURI: "__COGNITO_CLIENT_REDIRECT_URI_1__"
};

const pathBase = {
  clienteBienRaiz: '/ClienteBienRaizWS/api/BienRaiz',
  deudaRol: '/RecuperaDeudaROLRS/api/bienraiz',
  bienRaiz: '/BienRaizWS/api/BienRaiz'
};


export const environment = {
  snackbarTime: 5000,
  production: false,
  cuentaUrl: id.authorizeURL + "?response_type=token&client_id=" + id.clientId + "&redirect_uri=" + id.redirectURI,
  pago: {
    //url: 'https://test.tesoreria.cl/ConsultaTipoDeudaWEB/enviaMedioPago'
    url: '__URL_BOTON_PAGO_TGR__'
  },
  cognito: {
    authorizeURL: '__COGNITO_URL_AUTHORIZE__',
    //logoutURL: 'https://201811.auth.us-east-1.amazoncognito.com/logout',
    logoutURL: '__COGNITO_LOGOUT_URL__',
    //clientId: '2ntpfu2jj8miueillfdef8i93n',
    clientId: '__COGNITO_CLIENT_ID_2__',
    //redirectUri: 'http://localhost:4300/login',
    redirectUri: '__COGNITO_CLIENT_REDIRECT_URI_2__',
    //logoutUri: 'http://localhost:4300/logout',
    logoutUri: '__COGNITO_CLIENT_LOGOUT_URI_2__',
    jwtCookieName: 'tgr-jwt',
    expCookieName: 'exp',
    allowCookies: true,
  },
  sizeResultSuggested: 10,
  sizeResultPage: 30,
  certificados: {
    anoDesde: 1955,
  },
  dialogoRecuperarPropiedadesEmail: true,
  lambda: {
    enviarMailCodigoVerificacion: {
      url: urlsBase.lambdaRoles,
      path: '/codigorecuperacion/enviar',
      method: 'POST'
    },
    validarCodigo: {
      url: urlsBase.lambdaRoles,
      path: '/codigorecuperacion/validar',
      method: 'POST'
    },
    recuperar: {
      url: urlsBase.lambdaRoles,
      path: '/recuperar',
      method: 'POST'
    },
    asociar: {
      url: urlsBase.lambdaRoles,
      path: '/asociar',
      method: 'POST'
    },
    desasociar: {
      url: urlsBase.lambdaRoles,
      path: '/desasociar',
      method: 'POST'
    }
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
