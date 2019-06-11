import {AfterViewInit, Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {CognitoService} from '../../services/cognito.service';
import {MdlDialogOutletService, MdlDialogService} from '@angular-mdl/core';
import {environment} from '../../../environments/environment';
import {AsociarCorreoComponent} from '../dialogs/asociar-correo/asociar-correo.component';
import {UserDataService} from '../../user-data.service';



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
  constructor(route: ActivatedRoute,
              private router: Router,
              private user: UserService,
              private dialogService: MdlDialogService,
              private cognito: CognitoService,
              private vcRef: ViewContainerRef,
              private mdlDialogService: MdlDialogOutletService,
              private userdataservice: UserDataService) {
    this.mdlDialogService.setDefaultViewContainerRef(this.vcRef);
    this.index = 0;
    route.url.subscribe(() => {
      this.index = route.snapshot.firstChild.data['index'];
    });
    this.isActiveLogin = environment.isActiveLogin;
  }
  
  primeraMayuscula(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
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
    this.usuariologinmay = this.userdataservice.nombre_usuario.split(' ')[0];
    this.usuariologin = this.primeraMayuscula(this.usuariologinmay.toLowerCase);
    
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
