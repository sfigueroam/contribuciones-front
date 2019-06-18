const endpoints = {
  base: 'BUILD_BACK_ENDPOINT',
  lambdaRoles: 'BUILD_BACK_ENDPOINT',
  elastic: 'BUILD_BACK_ENDPOINT',
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
  recaptcha2: endpoints.validateRecaptcha + '/captcha/v2/api',
  recaptcha3: endpoints.validateRecaptcha + '/captcha/v3/api',
  deviceDetect: endpoints.deviceDetect
};

export const environment = {
  paginacion: 20,
  frecuentesOrder: {
    H: 1,
    L: 2,
    Z: 3
  },
  isActiveLogin: true,
  googleAnalyticsCode: 'BUILD_GOOGLE_ANALYTIC_CODE',
  snackbarTime: 5000,
  tooltipTime: 5000,
  viewTooltip: false,
  production: true,
  //TODO: llamar a una url privada de cuenta de usuario sin client-id
  cuentaUrl: 'BUILD_CUENTA_USUARIO_URL' + '/redirect',
  pago: {
    url: 'BUILD_URL_BOTON_PAGO_TGR'
  },
  cognito: {
    authorizeURL: 'BUILD_AUTHORIZE_URL',
    logoutURL: 'BUILD_LOGOUT_URL',
    clientId: 'BUILD_CLIENT_ID',
    redirectUri: 'BUILD_REDIRECT_URI',
    logoutUri: 'BUILD_LOGOUT_URI',
    jwtCookieName: 'tgr-jwt',
    expCookieName: 'exp',
    allowCookies: false,
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
      url: urlsBase.api,
      path: '/contribuciones/v1/usuarios/{idUsuario}/roles',
      method: 'GET'
    },
    asociar: {
      url: urlsBase.api,
      path: '/contribuciones/v1/usuarios/{idUsuario}/roles',
      method: 'POST'
    },
    desasociar: {
      url: urlsBase.api,
      path: '/contribuciones/v1/usuarios/{idUsuario}/roles/{rol}',
      method: 'DELETE'
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
