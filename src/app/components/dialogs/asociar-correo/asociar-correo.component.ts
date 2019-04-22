import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MdlDialogReference, MdlSnackbarService} from '@angular-mdl/core';
import {ContribucionesService, ResponseResultado} from '../../../services/contribuciones.service';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';

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
              private router: Router) {
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

  asociarCorreo(): void {
    this.correo = this.email.value;
    this.service.enviarMailCodigoVerificacion(this.correo).then(
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
    );

  }

  ingresarCodigo(): void {
    this.codigo = this.code.value;
    this.service.validarCodigo(this.correo, this.codigo).then(
      (resultado: ResponseResultado) => {
        if (resultado.ok()) {
          this.user.email = this.correo;
          this.service.propiedades = undefined;
          this.router.navigate(['main/contribuciones/seleccionar-cuotas'], {
            queryParams: {'refresh': true},
            skipLocationChange: true
          });
          /*this.user.getBienesRaices().then(
            (propiedades) => {
              if (propiedades.length > 0) {
                this.router.navigate(['main/contribuciones/seleccionar-cuotas'], {
                  queryParams: {'refresh': true},
                  skipLocationChange: true
                });
              } else {
                this.router.navigate(['main/contribuciones/agregar/nueva']);
              }
              this.close();
            }
          );*/
          this.close();
        } else {
          this.mdlSnackbarService.showToast(resultado.descripcion);
        }
      },
      (err) => {
        console.log(err);
        this.mdlSnackbarService.showToast('Ocurrió un error al validar el código');
      }
    );
  }

  otroCorreo(): void {
    this.estado = State.init;
  }

  close(): void {
    this.user.solicitarEmail = false;
    this.dialog.hide();
  }
}
