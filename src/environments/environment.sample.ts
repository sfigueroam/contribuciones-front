const endpoints = {
  publica: 'BUILD_BACK_ENDPOINT',
  privada: 'BUILD_BACK_ENDPOINT',
  lambdaRoles: 'BUILD_BACK_ENDPOINT',
  elastic: 'BUILD_ELASTICSEARCH_ENDPOINT',
};

const urlsBase = {
  publica: endpoints.publica + '/proxy-public',
  privada: endpoints.privada + '/proxy-private',
  elastic: endpoints.elastic,
  lambdaRoles: endpoints.lambdaRoles + '/roles'
};

const pathBase = {
  clienteBienRaiz: '/ClienteBienRaizWS/api/BienRaiz',
  deudaRol: '/RecuperaDeudaROLRS/api/bienraiz',
  bienRaiz: '/BienRaizWS/api/BienRaiz'
};


export const environment = {
  snackbarTime: 5000,
  production: true,
  cuentaUrl: 'BUILD_CUENTA_USUARIO_URL',
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
