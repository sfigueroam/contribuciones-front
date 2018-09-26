import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as M from 'materialize-css';

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.component.html',
  styleUrls: ['./certificados.component.css']
})
export class CertificadosComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // M.AutoInit();
  }
}
