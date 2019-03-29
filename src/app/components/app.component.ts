import {NavigationStart, Router} from '@angular/router';
import {Component} from '@angular/core';
import {RequestService} from '../services/request.service';
import {environment} from '../../environments/environment';
import {DeviceDetectService} from '../services/device-detect.service';
import {googleAnalytics} from '../../assets/googleAnalytics/script';
import {filter} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tgr-contribuciones-frontend';

  constructor(private deviceDetect: DeviceDetectService,
              private requestService: RequestService,
              private router: Router) {

    this.requestService.request(environment.deviceDetect)
      .then((response: { device: { desktop: boolean, mobile: boolean, smartTv: boolean, tablet: boolean } }) => {
        deviceDetect.setDevice(response);
      });

    this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe(
      event => {
        const url = event['url'];
        if (url !== null && url !== undefined && url !== '' && url.indexOf('null') < 0) {
          googleAnalytics(url);
        }
      });
  }
}
