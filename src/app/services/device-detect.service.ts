import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetectService {

  device: {desktop: boolean, mobile: boolean, smartTv: boolean, tablet: boolean} ;
  constructor() { }

  setDevice(device: { device: {desktop: boolean, mobile: boolean, smartTv: boolean, tablet: boolean} }): void {
    this.device = device.device;

  }

  isDeviceDesktop(): boolean{
    return this.device.desktop;
  }
}
