import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {googleAnalyticsHeadScripts} from './assets/googleAnalytics/script';
import {newRelicHeadScripts} from './assets/newRelic/scriptNewRelic';

if (environment.production) {
  enableProdMode();
}


googleAnalyticsHeadScripts();
/*
const newRelicBool = environment.applicationIDnewrelic;
if (newRelicBool) {
  newRelicHeadScripts();
}
*/







platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

