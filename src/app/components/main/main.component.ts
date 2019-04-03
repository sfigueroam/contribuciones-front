import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {CognitoService} from '../../services/cognito.service';
import {MdlDialogOutletService} from '@angular-mdl/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  logged: boolean;
  index: number;
  isActiveLogin: boolean;

  constructor(route: ActivatedRoute,
              private router: Router,
              private user: UserService,
              private cognito: CognitoService,
              private vcRef: ViewContainerRef,
              private mdlDialogService: MdlDialogOutletService) {
    this.mdlDialogService.setDefaultViewContainerRef(this.vcRef);
    this.index = 0;
    route.url.subscribe(() => {
      this.index = route.snapshot.firstChild.data['index'];
    });
    this.isActiveLogin = environment.isActiveLogin;
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
