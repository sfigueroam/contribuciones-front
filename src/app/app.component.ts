import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import * as M from 'materialize-css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'tgr-contribuciones-frontend';
  instance: any;

  @ViewChild('sidenav')
  sidenav: ElementRef;

  closeSidenav(): void {
    this.instance.close();
  }

  ngAfterViewInit(): void {
    console.log(this.sidenav.nativeElement);
    this.instance = M.Sidenav.init(this.sidenav.nativeElement);
    console.log(this.instance);
  }

  openSidenav(): void {
    this.instance.open();
  }
}
