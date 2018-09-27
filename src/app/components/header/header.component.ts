import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as M from 'materialize-css';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @ViewChild('sidenav') viewChildren: ElementRef;
  instance: any;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

    console.log(this.viewChildren.nativeElement);

    M.AutoInit();
    this.instance = M.Sidenav.init(this.viewChildren.nativeElement, {
      inDuration: 500,
      outDuration: 500
    });
  }

  closeSidenavbar(): void {
    this.instance.close();
  }

}
