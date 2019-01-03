import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RecuperarRolesCorreoService, ResponseResultado} from '../../../services/recuperar-roles-correo.service';
import {MdlSnackbarService} from '@angular-mdl/core';

export enum State {
  init, registered, unregistered
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

  correo: string;

  constructor(private service: RecuperarRolesCorreoService, private mdlSnackbarService: MdlSnackbarService) {
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
          this.estado = State.registered;
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
    this.estado = State.unregistered;
  }

  show(): void {
    this.dialog.nativeElement.showModal();
  }

  close(): void {
    this.dialog.nativeElement.close();
  }
}
