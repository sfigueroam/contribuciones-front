import {Component, OnInit} from '@angular/core';
import {CognitoService} from '../../services/cognito.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {UserDataService} from '../../user-data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  identity: any;
  name: any;
  exp: Date;
  
  constructor(private cognito: CognitoService, 
              private route: ActivatedRoute, 
              private router: Router, 
              private user: UserService,
              private userdataservice: UserDataService) {
    this.cognito.login(route.snapshot.fragment).then(
      value => {
        this.identity = value;
        this.name = value.name;
        if(this.name == undefined || this.name == null){
          this.name = value.username;
        }
        this.user.getBienesRaices().then(
          () => this.router.navigate(['/centropago/contribuciones/seleccionar-cuotas']),
          (err) => {
            console.log(err);
            this.router.navigate(['/centropago/contribuciones/seleccionar-cuotas']);
          }
        );
      }
    );
  } 

  ngOnInit() {

    this.exp = this.cognito.getExpirationDate();
    this.userdataservice.nombre_usuario = this.name;
    
  }
}
