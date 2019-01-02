import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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

  constructor() {
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
    this.estado = State.registered;
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
