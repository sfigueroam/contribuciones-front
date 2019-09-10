import {Injectable} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {CognitoService} from '../../services/cognito.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {UserDataService} from '../../user-data.service';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-sinclave',
  templateUrl: './sinclave.component.html',
  styleUrls: ['./sinclave.component.css']
})
export class SinclaveComponent implements OnInit {

provider: any;

  constructor(private cognito: CognitoService, 
              private route: ActivatedRoute, 
              private router: Router, 
              private user: UserService,
              private cookieService: CookieService) { }

  ngOnInit() {
    
        //rescata la cookie y valida que no venga vacia:
    this.provider = this.cookieService.get("providerCookie");
    console.log("provider en login2: ");
    console.log(this.provider);
    if (this.provider == "") {
      //window.location.href = '/main/contribuciones/agregar/nueva';
    } else {
          this.cognito.removeCookies();
          window.location.href = '/main/contribuciones/agregar/nueva';
    }
  }

}
