import {AfterViewInit, Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {CognitoService} from '../../services/cognito.service';
import {MdlDialogOutletService, MdlDialogReference, MdlDialogService} from '@angular-mdl/core';
import {environment} from '../../../environments/environment';
import {AsociarCorreoComponent} from '../dialogs/asociar-correo/asociar-correo.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {

  logged: boolean;
  index: number;
  isActiveLogin: boolean;
  isAuthenticatedEmail: boolean;
  isActiveLoginEmail: boolean;

  constructor(route: ActivatedRoute,
              private router: Router,
              private user: UserService,
              private dialogService: MdlDialogService,
              private cognito: CognitoService,
              private vcRef: ViewContainerRef,
              private mdlDialogService: MdlDialogOutletService) {
    this.isAuthenticatedEmail = false;
    this.mdlDialogService.setDefaultViewContainerRef(this.vcRef);
    this.index = 0;
    route.url.subscribe(() => {
      this.index = route.snapshot.firstChild.data['index'];
    });
    this.isActiveLogin = environment.isActiveLogin;
  }

  ngAfterViewInit(): void {
    setTimeout(
      () => {
        this.dialogCorreo();
      },
      200);
  }

  ngOnInit() {
    this.isActiveLoginEmail = environment.dialogoRecuperarPropiedadesEmail;
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

  public async cerrarSesion() {
    await this.cognito.signOutEmail();
    await this.validSession();
    this.router.navigate(['/'], {
      skipLocationChange: true
    });

  }

  public async validSession() {
    this.isAuthenticatedEmail = await this.cognito.isAuthenticatedMail();

  }

  public async dialogCorreo() {

    if (!this.user.email && this.user.solicitarEmail && this.isActiveLoginEmail) {
      const config = {
        component: AsociarCorreoComponent,
        isModal: true,
        classes: 'dialogo-correo'
      };


      await this.validSession();
      if (!this.isAuthenticatedEmail) {
        const pDialog = this.dialogService.showCustomDialog(config);
        pDialog.subscribe((dialogReference: MdlDialogReference) => {
          dialogReference.onHide().subscribe(
            data => {
              this.validSession();
            }
          );
        });
      } else {
        const userDetails = await this.cognito.getUserDetails();
        console.log(userDetails);
        this.user.email = userDetails;
        this.router.navigate(['main/contribuciones/seleccionar-cuotas'], {
          skipLocationChange: true
        });
      }
    }

  }
}
