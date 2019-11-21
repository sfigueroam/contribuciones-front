import {AfterViewInit, Component, Input, OnInit, ViewContainerRef, NgZone} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {CognitoService} from '../../services/cognito.service';
import {MdlDialogOutletService, MdlDialogService} from '@angular-mdl/core';
import {environment} from '../../../environments/environment';
import {AsociarCorreoComponent} from '../dialogs/asociar-correo/asociar-correo.component';
import {UserDataService} from '../../user-data.service';
import {CookieService} from 'ngx-cookie-service';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {

  logged: boolean;
  index: number;
  isActiveLogin: boolean;
  usuariologinmay: string;
  usuariologin: string;
  usuario1: string;
  usuario2: string;
  usuario2min: string;

  constructor(route: ActivatedRoute,
              private router: Router,
              private user: UserService,
              private dialogService: MdlDialogService,
              private cognito: CognitoService,
              private vcRef: ViewContainerRef,
              private mdlDialogService: MdlDialogOutletService,
              private userdataservice: UserDataService,
              private cookieService: CookieService,
              private zone: NgZone) {
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
  
   this.logged = this.user.isLogged();
  // this.usuariologin = this.userdataservice.nombre_usuario;
    if (this.userdataservice.nombre_usuario != ''){
        this.usuario1 = this.userdataservice.nombre_usuario.substring(0,1);
        this.usuario2 = this.userdataservice.nombre_usuario.substring(1,100);
        this.usuario2min = this.usuario2.toLowerCase();
        this.usuariologin = this.usuario1.concat(this.usuario2min);
      }
 
    
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
    this.cookieService.delete('providerCookie','/');
    this.cookieService.deleteAll('/');
    this.cognito.logout();
  }

  dialogCorreo(): void {

    if (!this.user.email && this.user.solicitarEmail && environment.dialogoRecuperarPropiedadesEmail) {
      const config = {
        component: AsociarCorreoComponent,
        isModal: true,
        classes: 'dialogo-correo'
      };

      const pDialog = this.dialogService.showCustomDialog(config);
      /*pDialog.subscribe((dialogReference: MdlDialogReference) => {
        dialogReference.onHide().subscribe(
          () => this.bottomToolbarHidden = false
        );
      });*/
    }

  }
}
