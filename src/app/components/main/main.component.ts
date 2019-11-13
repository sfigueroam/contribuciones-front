import {AfterViewInit, Component, Input, OnInit, ViewContainerRef, NgZone} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {CognitoService} from '../../services/cognito.service';
import {MdlDialogOutletService, MdlDialogService} from '@angular-mdl/core';
import {environment} from '../../../environments/environment';
import {AsociarCorreoComponent} from '../dialogs/asociar-correo/asociar-correo.component';
import {UserDataService} from '../../user-data.service';
import {DeviceDetectService} from '../../services/device-detect.service'
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
  canal: string;
  reg: string;
  providerConex: string;
  // variables prueba
  mobile: boolean;
  constructor(route: ActivatedRoute,
              private router: Router,
              private user: UserService,
              private dialogService: MdlDialogService,
              private cognito: CognitoService,
              private vcRef: ViewContainerRef,
              private mdlDialogService: MdlDialogOutletService,
              private userdataservice: UserDataService,
              private cookieService: CookieService,
              private devicedetectservice: DeviceDetectService,
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
   this.usuariologin = this.userdataservice.nombre_usuario;
   console.log(this.usuariologin);
    // if (this.userdataservice.nombre_usuario === '' || this.userdataservice.nombre_usuario === null || this.userdataservice.nombre_usuario === undefined){
    //   this.usuariologin = '';
    // }   else{
    //     this.usuariologinmay = this.userdataservice.nombre_usuario.split(' ')[0];
    //     this.usuario1 = this.usuariologinmay.substring(0,1);
    //     this.usuario2 = this.usuariologinmay.substring(1,100);
    //     this.usuario2min = this.usuario2.toLowerCase();
    //     this.usuariologin = this.usuario1.concat(this.usuario2min);

    //   }
    this.canal = '';
    this.reg = '';
    this.providerConex = this.cookieService.get("providerCookie")
      if (this.providerConex == "") {
        console.log(this.reg);
        this.reg = 'SC';
      }
      if (this.providerConex == "ClaveTesoreria"){
        console.log(this.reg);
        this.reg = 'CT';
      }
      if (this.providerConex == "ClaveUnica"){
        console.log(this.reg);
        this.reg = 'CU';
      }
      // prueba funcion mobile
      this.mobile = this.devicedetectservice.isDeviceDesktop();
      if (this.devicedetectservice.device.mobile){
        console.log("mobile");
        this.canal = '30M' + this.reg; 
      }
      if (this.devicedetectservice.device.tablet){
        console.log("tablet");
        this.canal = '30T' + this.reg; 
      }
      if (this.devicedetectservice.device.smartTv){
        console.log("smarttv");
        this.canal = '30S' + this.reg;
      }
      if (this.devicedetectservice.device.desktop){
        console.log("desktop");
        this.canal = '30D' + this.reg;
      }
      console.log(this.canal);
      console.log(this.providerConex);
      this.userdataservice.canal = this.canal;
    
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
