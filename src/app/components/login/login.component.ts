import {Component, OnInit} from '@angular/core';
import {CognitoService} from '../../services/cognito.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';

//obtener datos del jwt (nombre para uso en la sesion)
import * as jwt_decode from 'jwt-decode';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  identity: any;

  exp: Date;
  

  constructor(private cognito: CognitoService, private route: ActivatedRoute, private router: Router, private user: UserService) {
    this.cognito.login(route.snapshot.fragment).then(
      value => {
        this.identity = value;
        //prueba
            console.log('value' || value);
            console.log('value' || this.identity);
            console.log('value' || this.exp);
            
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
  }
}
