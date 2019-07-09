import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {googleAnalyticsHeadScripts} from './assets/googleAnalytics/script';
//import {newRelicHeadScripts} from './assets/newRelic/script';

if (environment.production) {
  enableProdMode();
}

var appID = environment.applicationIDnewrelic;
//newRelicHeadScripts();
googleAnalyticsHeadScripts(); 








platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

