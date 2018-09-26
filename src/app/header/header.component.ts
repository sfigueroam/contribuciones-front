import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as M from 'materialize-css';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit{

  @ViewChild('sidenav') viewChildren: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    console.log(this.viewChildren.nativeElement);

    M.AutoInit();
    let instance = M.Sidenav.init(this.viewChildren.nativeElement, {});
    console.log(instance);
  }

}
