import {Injectable} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {CognitoService} from '../../services/cognito.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {UserDataService} from '../../user-data.service';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})

export class Login2Component implements OnInit {

  provider: any;


  constructor(private cognito: CognitoService, 
              private route: ActivatedRoute, 
              private router: Router, 
              private user: UserService,
              private cookieService: CookieService) { }

  loginUrl(): string {
    return environment.cognito.authorizeURL
      + '?response_type=token&client_id='
      + environment.cognito.clientId
      + '&redirect_uri='
      + environment.cognito.redirectUri;
  }

  ngOnInit() {
    //rescata la cookie y valida que no venga vacia:
    this.provider = this.cookieService.get("providerCookie");
    console.log("provider en login2: ");
    console.log(this.provider);
    if (this.provider == "") {
      //window.location.href = this.loginUrl();
    } else {
      //window.location.href = '/main/contribuciones/agregar/nueva';
    }
    
  }

}
