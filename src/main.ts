import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {googleAnalyticsHeadScripts} from './assets/googleAnalytics/script';

import Amplify from 'aws-amplify';

if (environment.production) {
  enableProdMode();
}
Amplify.configure({
  Auth: {
    region: environment.region,
    userPoolId: environment.userPoolId,
    userPoolWebClientId: environment.userPoolWebClientId,
  }
});
googleAnalyticsHeadScripts();


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
