// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlWsTierra: 'https://dm5ujuys5b.execute-api.us-east-1.amazonaws.com/dev/proxy-public',
  wsTierra: {
    obtenerBienRaizAsociado: 'ClienteBienRaizWS/api/BienRaiz/asociado/obtener',
    obtenerBienRaizNoAsociado: 'ClienteBienRaizWS/api/BienRaiz/noasociado/obtener',
    asociarBienRaiz: '/ClienteBienRaizWS/api/BienRaiz/bienraiz/asociar',
    desasociarBienRaiz: '/ClienteBienRaizWS/api/BienRaiz/bienraiz/desasociar',
    recuperarDeudaRol: '/RecuperaDeudaROLRS/api/bienraiz/deuda/rol/obtiene',
    buscarBienRaiz: '/BienRaizWS/api/BienRaiz/bienraiz/obtener/rolin'
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
