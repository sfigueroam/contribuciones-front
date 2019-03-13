const endpoints = {
  base: 'https://aonbim65f5.execute-api.us-east-1.amazonaws.com/dev',
  lambdaRoles: '',
  elastic: 'https://w2jmtnip5c.execute-api.us-east-1.amazonaws.com/dev',
  validateRecaptcha: 'https://aonbim65f5.execute-api.us-east-1.amazonaws.com/dev'
};

const urlsBase = {
  api: endpoints.base + '/api',
  elastic: endpoints.elastic,
  lambdaRoles: endpoints.lambdaRoles + '/roles',
  recaptcha2 : endpoints.validateRecaptcha + '/captcha/v2',
  recaptcha3 : endpoints.validateRecaptcha + '/captcha/v3'

};

const id = {
  authorizeURL: "https://autentica-dev.tegere.info/oauth2/authorize",
  clientId: "178vr805sl67cfm1u83m3vtv3c",
  redirectURI: "http://localhost:4302/login"
};

const pathBase = {
  clienteBienRaiz: '/ClienteBienRaizWS/api/BienRaiz',
  deudaRol: '/RecuperaDeudaROLRS/api/bienraiz',
  bienRaiz: '/BienRaizWS/api/BienRaiz'
};


export const environment = {
  snackbarTime: 5000,
  production: true,
  cuentaUrl: id.authorizeURL + "?response_type=token&client_id=" + id.clientId + "&redirect_uri=" + id.redirectURI,
  pago: {
    url: 'http://test2.tesoreria.cl/ConsultaTipoDeudaWEB/enviaMedioPago'
  },
  cognito: {
    authorizeURL: 'https://autentica-dev.tegere.info/oauth2/authorize',
    logoutURL: '',
    clientId: '3eqo995p7hord0t8vsdma4r8a8',
    redirectUri: 'http://localhost:4202/login',
    logoutUri: '',
    jwtCookieName: 'tgr-jwt',
    expCookieName: 'exp',
    allowCookies: true,
  },
  sizeResultSuggested: 10,
  sizeResultPage: 30,
  certificados: {
    anoDesde: 1955,
  },
  dialogoRecuperarPropiedadesEmail: false,
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
      url: urlsBase.api + '/tgrSuscriptorWs/api/suscriptor/certificado/obtener',
      method: 'POST'
    },
    certificadoHistorialPago: {
      url: urlsBase.api + '/recaPagoConsultasWS/api/pago/consulta',
      method: 'POST'
    },
    obtenerBienRaizAsociado: {
      url: urlsBase.api + '/ClienteBienRaizWS/api/BienRaiz/asociado/obtener',
      method: 'GET'
    },
    obtenerBienRaizNoAsociado: {
      url: urlsBase.api + '/ClienteBienRaizWS/api/BienRaiz/noasociado/obtener',
      method: 'GET'
    },
    asociarBienRaiz: {
      url: urlsBase.api + '/ClienteBienRaizWS/api/BienRaiz/bienraiz/asociar',
      method: 'POST'
    },
    desasociarBienRaiz: {
      url: urlsBase.api +  '/ClienteBienRaizWS/api/BienRaiz/bienraiz/desasociar',
      method: 'POST'
    },
    recuperarDeudaRol: {
      url: urlsBase.api +  '/RecuperaDeudaROLRS/api/bienraiz/deuda/rol/obtiene',
      method: 'POST'
    },
    buscarBienRaiz: {
      url: urlsBase.api +  '/BienRaizWS/api/BienRaiz/bienraiz/obtener/rolin',
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
  },
  recaptcha: {
    v2: {
      url: urlsBase.recaptcha2,
      method: 'POST'
    },
    v3: {
      url: urlsBase.recaptcha3,
      method: 'POST'
    }
  }
};
