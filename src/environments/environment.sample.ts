const endpoints = {
  base: 'BUILD_BACK_ENDPOINT',
  lambdaRoles: 'BUILD_BACK_ENDPOINT',
  elastic: 'BUILD_ELASTICSEARCH_ENDPOINT',
  validateRecaptcha: 'BUILD_BACK_ENDPOINT',
  deviceDetect: 'BUILD_DEVICE_INFO_ENDPOINT'
};

const keyRecaptcha = {
  v2: 'BUILD_RECAPTCHA_KEY_V2',
  v3: 'BUILD_RECAPTCHA_KEY_V3'
};

const urlsBase = {
  api: endpoints.base + '/api',
  elastic: endpoints.elastic,
  lambdaRoles: endpoints.lambdaRoles + '/roles',
  recaptcha2 : endpoints.validateRecaptcha + '/captcha/v2',
  recaptcha3 : endpoints.validateRecaptcha + '/captcha/v3',
  deviceDetect: endpoints.deviceDetect
};



export const environment = {
  snackbarTime: 5000,
  production: true,
  //TODO: llamar a una url privada de cuenta de usuario sin client-id
  cuentaUrl: 'BUILD_CUENTA_USUARIO_URL' + '/redirect',
  pago: {
    url: 'BUILD_BOTON_PAGO_TGR_URL'
  },
  cognito: {
    authorizeURL: 'BUILD_AUTHORIZE_URL',
    logoutURL: 'BUILD_LOGOUT_URL',
    clientId: 'BUILD_CLIENT_ID',
    redirectUri: 'BUILD_REDIRECT_URI',
    logoutUri: 'BUILD_LOGOUT_URI',
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
