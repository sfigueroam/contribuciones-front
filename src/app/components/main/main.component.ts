import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {CognitoService} from '../../services/cognito.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  logged: boolean;
  index: number;

  constructor(route: ActivatedRoute,
              private router: Router,
              private user: UserService,
              private cognito: CognitoService) {
    this.index = 0;
    route.url.subscribe(() => {
      this.index = route.snapshot.firstChild.data['index'];
    });
  }

  ngOnInit() {
    this.logged = this.user.isLogged();
  }

  tabChanged({index}) {
    this.index = index;
    if (index === 0) {
      this.router.navigate(['/main/contribuciones/seleccionar-cuotas']);
    } else if (index === 1) {
      this.router.navigate(['/main/contribuciones/certificados']);
    }
  }

  redirigirMiCuenta() {
    this.user.redirectMiCuenta();
  }

  redirigirLogin() {
    this.cognito.redirectLogin();
  }

  logout() {
    this.cognito.logout();
  }
}
