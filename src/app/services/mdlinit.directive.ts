import {AfterViewInit, Directive} from '@angular/core';

declare var componentHandler: any;

@Directive({
  selector: '[appMdlInit]'
})
export class MDLInitDirective implements AfterViewInit {
  ngAfterViewInit() {
    componentHandler.upgradeAllRegistered();
  }
}
