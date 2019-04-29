import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MdlDialogReference, MdlSnackbarService} from '@angular-mdl/core';
import {ContribucionesService} from '../../../services/contribuciones.service';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {CognitoService} from '../../../services/cognito.service';

export enum State {
  init, verification
}

@Component({
  selector: 'app-asociar-correo',
  templateUrl: './asociar-correo.component.html',
  styleUrls: ['./asociar-correo.component.scss']
})
export class AsociarCorreoComponent implements OnInit {

  estados = State;
  estado = State.init;

  formEmail: FormGroup;
  email: FormControl;

  formCode: FormGroup;
  code: FormControl;

  correo: string;
  codigo: string;

  constructor(private dialog: MdlDialogReference,
              private service: ContribucionesService,
              private mdlSnackbarService: MdlSnackbarService,
              private user: UserService,
              private router: Router,
              private cognito: CognitoService) {
    this.email = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
    this.formEmail = new FormGroup({
      email: this.email
    });

    this.code = new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]);
    this.formCode = new FormGroup({
      code: this.code
    });
  }

  ngOnInit() {
  }

  public async asociarCorreo() {
    this.correo = this.email.value.toLowerCase();
    try {
      await this.cognito.signInEmail(this.correo);
      this.estado = State.verification;
    } catch (e) {
      console.log('erro', e);
      this.mdlSnackbarService.showToast('Ocurrió un error al enviar el correo de validación');
    }


    /*this.service.enviarMailCodigoVerificacion(this.correo).then(
      (resultado: ResponseResultado) => {
        if (resultado.ok()) {
          this.estado = State.verification;
        } else {
          this.mdlSnackbarService.showToast(resultado.descripcion);
        }
      },
      (err) => {
        console.log(err);
        this.mdlSnackbarService.showToast('Ocurrió un error al enviar el correo de validación');
      }
    );*/

  }

  public async ingresarCodigo() {
    this.codigo = this.code.value;
    try {
      const loginSucceeded = await this.cognito.answerCustomChallenge(this.codigo);
      this.user.email = this.correo;
      this.service.propiedades = undefined;
      this.router.navigate(['main/contribuciones/seleccionar-cuotas'], {
        queryParams: {'refresh': true},
        skipLocationChange: true

      });
      this.close();
    } catch (e) {
      console.log('err', e);
      this.mdlSnackbarService.showToast('Ocurrió un error al validar el código');
    }
    /*this.service.validarCodigo(this.correo, this.codigo).then(
      (resultado: ResponseResultado) => {
        if (resultado.ok()) {
          this.user.email = this.correo;
          this.service.propiedades = undefined;
          this.router.navigate(['main/contribuciones/seleccionar-cuotas'], {
            queryParams: {'refresh': true},
            skipLocationChange: true
          });

          this.close();
        } else {
          this.mdlSnackbarService.showToast(resultado.descripcion);
        }
      },
      (err) => {
        console.log(err);
        this.mdlSnackbarService.showToast('Ocurrió un error al validar el código');
      }
    );*/
  }

  otroCorreo(): void {
    this.estado = State.init;
  }

  close(): void {
    this.user.solicitarEmail = false;
    this.dialog.hide();
  }
}
