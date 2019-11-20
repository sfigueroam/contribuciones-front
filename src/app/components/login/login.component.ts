import {Component, OnInit} from '@angular/core';
import {CognitoService} from '../../services/cognito.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {UserDataService} from '../../user-data.service';
import {CookieService} from 'ngx-cookie-service';
// import {DeviceDetectService} from '../../services/device-detect.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  identity: any;
  name_array: string;
  name: any;
  inicio: number;
  fin: number;
  exp: Date;
  provider_array: any;
  provider: any;
  reg: string;
  canal: string;
  
  
  constructor(private cognito: CognitoService, 
              private route: ActivatedRoute, 
              private router: Router, 
              private user: UserService,
              private cookieService: CookieService,
              private userdataservice: UserDataService) {
    this.cognito.login(route.snapshot.fragment).then(
      value => {
        this.identity = value;
        
        // this.name_array = value.name;
        // this.fin = this.name_array.search(",");
        // this.name = this.name_array.substring(13, this.fin - 1);
        
        this.provider_array = value.identities[0];
        this.provider = this.provider_array.providerName;
        
        this.name_array = JSON.stringify(value.name);
        console.log("name_array: ", JSON.parse(this.name_array));
        JSON.parse(this.name_array, (key, value) => {
          if (key === 'nombres'){
            return value;
            this.name = value;
          } 
        });
        console.log("nombre_: ", this.name);
        
        if(this.name == undefined || this.name == null){
          this.name = "";
        }
        // revisar el despliegue del nombre en qa
        // if (this.provider == "ClaveUnica"){
        //   this.name = value.name.nombres[0];
        //   // this.name = value.name;
        // }
        this.user.getBienesRaices().then(
          () => this.router.navigate(['/main/contribuciones/seleccionar-cuotas']),
          (err) => {
            console.log(err);
            this.router.navigate(['/main/contribuciones/seleccionar-cuotas']);
          }
        );
      }
    );
  } 

  ngOnInit() {

    this.exp = this.cognito.getExpirationDate();
    this.userdataservice.nombre_usuario = this.name;
    
    //crea cookie con el valor del provider:
    this.cookieService.set("providerCookie", this.provider);
    //this.userdataservice.conex_usuario = this.provider;
    console.log(this.identity);
    console.log(this.provider);
    console.log("nombre en login: ", this.name);
  }
}
