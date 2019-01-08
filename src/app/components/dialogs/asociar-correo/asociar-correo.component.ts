import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MdlSnackbarService} from '@angular-mdl/core';
import {ContribucionesService, ResponseResultado} from '../../../services/contribuciones.service';
import {UserService} from '../../../services/user.service';

export enum State {
  init, verification
}

@Component({
  selector: 'app-asociar-correo',
  templateUrl: './asociar-correo.component.html',
  styleUrls: ['./asociar-correo.component.scss']
})
export class AsociarCorreoComponent implements OnInit {

  @ViewChild('dialog')
  dialog: ElementRef;

  estados = State;
  estado = State.init;

  formEmail: FormGroup;
  email: FormControl;

  formCode: FormGroup;
  code: FormControl;

  callback: any;

  correo: string;
  codigo: string;

  constructor(private service: ContribucionesService, private mdlSnackbarService: MdlSnackbarService, private user: UserService) {
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

  show(callback: any): void {
    this.callback = callback;
    this.dialog.nativeElement.showModal();
  }

  close(): void {
    this.user.solicitarEmail = false;
    if (this.callback) {
      this.callback();
    }
    this.dialog.nativeElement.close();
  }
}
