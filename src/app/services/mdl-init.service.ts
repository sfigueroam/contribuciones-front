import {Directive, AfterViewInit} from '@angular/core';

declare var componentHandler: any;

@Directive({
  selector: '[appMdlInit]'
})
export class MDL implements AfterViewInit {
  ngAfterViewInit() {
    componentHandler.upgradeAllRegistered();
  }
}
