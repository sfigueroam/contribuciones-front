"use strict";
exports.__esModule = true;
var endpoints = {
    base: 'https://9l70yekz53.execute-api.us-east-1.amazonaws.com/dev',
    lambdaRoles: 'https://9l70yekz53.execute-api.us-east-1.amazonaws.com/dev',
    elastic: 'https://9l70yekz53.execute-api.us-east-1.amazonaws.com/dev',
    validateRecaptcha: 'https://9l70yekz53.execute-api.us-east-1.amazonaws.com/dev',
    deviceDetect: 'https://front-dev.tegere.info/v1/user/info'
};
var keyRecaptcha = {
    v2: '6LcObZUUAAAAAIy5A6GCnsxaIyt30YjQeZnShVls',
    v3: '6Lc2dpUUAAAAAMYdfS1Cin3np310tS_dYpoH9JxC'
};
var urlsBase = {
    api: endpoints.base + '/api',
    elastic: endpoints.elastic,
    lambdaRoles: endpoints.lambdaRoles + '/roles',
    recaptcha2: endpoints.validateRecaptcha + '/captcha/v2/api',
    recaptcha3: endpoints.validateRecaptcha + '/captcha/v3/api',
    deviceDetect: endpoints.deviceDetect
};
exports.environment = {
    paginacion: 20,
    frecuentesOrder: {
        H: 1,
        L: 2,
        Z: 3
    },
    isActiveLogin: true,
    googleAnalyticsCode: 'UA-122466192-2',
    applicationIDnewrelic: '359089179',
    snackbarTime: 5000,
    tooltipTime: 5000,
    viewTooltip: true,
    production: false,
    //TODO: llamar a una url privada de cuenta de usuario sin client-id 
    cuentaUrl: 'https://mc-dev.tegere.info' + '/redirect',
    // urlApiObtieneDeuda: "https://9l70yekz53.execute-api.us-east-1.amazonaws.com/dev/servicios-recaudacion/v1/liquidacion/deudasrol/",
    pago: {
        url: 'https://test.tesoreria.cl/ConsultaTipoDeudaWEB/enviaMedioPago'
    },
    cognito: {
        authorizeURL: 'https://autentica-dev.tegere.info/oauth2/authorize',
        logoutURL: 'https://autentica.tegere.info/logout',
        clientId: '4lmo6gpuqsi6ooscnb6hk719ue',
        redirectUri: 'https://bbrr-dev.tegere.info/login',
        logoutUri: 'https://bbrr-dev.tegere.info/logout',
        jwtCookieName: 'tgr-jwt',
        expCookieName: 'exp',
        allowCookies: true
    },
    sizeResultSuggested: 10,
    sizeResultPage: 30,
    certificados: {
        anoDesde: 1955
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
        // JMS: busca rol en tierra
        recuperarDeudaRol: {
            url: urlsBase.api + '/RecuperaDeudaROLRS/api/bienraiz/deuda/rol/obtiene',
            method: 'POST'
        },
        // JMS: nuevo para buscar en nuevo servicio tierra
        urlApiObtieneDeuda: {
            url: urlsBase.api + '/servicios-recaudacion/v1/liquidacion/deudasrol',
            method: 'GET'
        },
        urlMultiAR: endpoints.base + '/servicios-recaudacion/v1/liquidacion/ingresamultiar',
        // urlApiMultiAR: {
        //   url: endpoints.base + '/servicios-recaudacion/v1/liquidacion/ingresamultiar', 
        //   method: 'POST' 
        // }, 
        buscarBienRaiz: {
            url: urlsBase.api + '/BienRaizWS/api/BienRaiz/bienraiz/obtener/rolin',
            method: 'POST',
            recaptcha: {
                v2: urlsBase.recaptcha2 + '/BienRaizWS/api/BienRaiz/bienraiz/obtener/rolin',
                v3: urlsBase.recaptcha3 + '/BienRaizWS/api/BienRaiz/bienraiz/obtener/rolin'
            }
        }
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
        }
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
