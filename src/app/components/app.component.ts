import {Component} from '@angular/core';
import {UserService} from '../services/user.service';
import {RequestService} from '../services/request.service';
import {environment} from '../../environments/environment';
import {DeviceDetectorService} from 'ngx-device-detector';
import {DeviceDetectService} from '../services/device-detect.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tgr-contribuciones-frontend';

  constructor(private deviceDetect: DeviceDetectService,
              private requestService: RequestService) {

    this.requestService.request(environment.deviceDetect)
      .then((response: { device: { desktop: boolean, mobile: boolean, smartTv: boolean, tablet: boolean } }) => {
      deviceDetect.setDevice(response);
    });

  }
}
