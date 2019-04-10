const endpoints = {
  base: 'https://9l70yekz53.execute-api.us-east-1.amazonaws.com/dev',
  lambdaRoles: '',
  elastic: 'https://9l70yekz53.execute-api.us-east-1.amazonaws.com/dev',
  validateRecaptcha: 'https://9l70yekz53.execute-api.us-east-1.amazonaws.com/dev',
  deviceDetect: 'https://9l70yekz53.execute-api.us-east-1.amazonaws.com/dev'
};

const keyRecaptcha = {
  v2: '6LcObZUUAAAAAIy5A6GCnsxaIyt30YjQeZnShVls',
  v3: '6Lc2dpUUAAAAAMYdfS1Cin3np310tS_dYpoH9JxC'
};

const urlsBase = {
  api: endpoints.base + '/api',
  elastic: endpoints.elastic,
  lambdaRoles: endpoints.lambdaRoles + '/roles',
  recaptcha2: endpoints.validateRecaptcha + '/captcha/v2/api',
  recaptcha3: endpoints.validateRecaptcha + '/captcha/v3/api',
  deviceDetect: endpoints.deviceDetect + '/detect'
};


export const environment = {
  paginacion: 20,
  frecuentesOrder: {
    H: 1,
    L: 2,
    Z: 3
  },
  isActiveLogin: false,
  googleAnalyticsCode: 'UA-136994548-1',
  snackbarTime: 5000,
  production: true,
  cuentaUrl: 'http://localhost:4201' + '/redirect',
  pago: {
    url: 'http://test2.tesoreria.cl/ConsultaTipoDeudaWEB/enviaMedioPago'
  },
  cognito: {
    authorizeURL: 'https://autentica-dev.tegere.info/oauth2/authorize',
    logoutURL: '',
    clientId: '2ihs7thp1tgtpqtdj3576kvbgr',
    redirectUri: 'https://bbrr-dmezaa.tegere.info/login',
    logoutUri: 'https://bbrr-dmezaa.tegere.info/logout',
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
      url: urlsBase.api + '/ClienteBienRaizWS/api/BienRaiz/bienraiz/desasociar',
      method: 'POST'
    },
    recuperarDeudaRol: {
      url: urlsBase.api + '/RecuperaDeudaROLRS/api/bienraiz/deuda/rol/obtiene',
      method: 'POST'
    },
    buscarBienRaiz: {
      url: urlsBase.api + '/BienRaizWS/api/BienRaiz/bienraiz/obtener/rolin',
      method: 'POST',
      recaptcha: {
        v2: urlsBase.recaptcha2 + '/BienRaizWS/api/BienRaiz/bienraiz/obtener/rolin',
        v3: urlsBase.recaptcha3 + '/BienRaizWS/api/BienRaiz/bienraiz/obtener/rolin'
      }
    },

  },
  elastic: {
    localidad: {
      url: urlsBase.elastic + '/elasticsearch/localidad',
      method: 'POST',
      body: {
        size: 400,
        from: 0
      }
    },
    tiposPropiedades: {
      url: urlsBase.elastic + '/elasticsearch/tipo_propiedad',
      method: 'POST',
      body: {
        size: 400,
        from: 0
      }
    },
    propiedades: {
      url: urlsBase.elastic + '/elasticsearch/propiedad',
      method: 'POST',
      recaptcha: {
        v2: urlsBase.recaptcha2 + '/elasticsearch/propiedad',
        v3: urlsBase.recaptcha3 + '/elasticsearch/propiedad'
      }
    },
  },
  recaptcha: {
    v2: {
      url: urlsBase.recaptcha2,
      method: 'POST',
      key: keyRecaptcha.v2
    },
    v3: {
      url: urlsBase.recaptcha3,
      method: 'POST',
      key: keyRecaptcha.v3
    }
  },
  deviceDetect: {
    url: urlsBase.deviceDetect,
    method: 'GET'
  }

};
