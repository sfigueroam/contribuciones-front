import {Component, OnInit} from '@angular/core';
import {ContribucionesBuscarRolService} from '../../../../services/contribuciones-buscar-rol.service';
import {Localidad} from '../../../../domain/Localidad';
import {MdlSnackbarService} from '@angular-mdl/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-agregar-nueva',
  templateUrl: './agregar-nueva.component.html',
  styleUrls: ['./agregar-nueva.component.scss']
})
export class AgregarNuevaComponent implements OnInit {

  localidad: Localidad[];
  form: FormGroup;
  comuna: FormControl;
  rol: FormControl;
  subRol: FormControl;


  constructor(private contribucionesBuscarRolService: ContribucionesBuscarRolService,
              private mdlSnackbarService: MdlSnackbarService) {
    this.comuna = new FormControl('', Validators.required);
    this.rol = new FormControl('', Validators.required);
    this.subRol = new FormControl('', Validators.required);

    this.form = new FormGroup({
      comuna: this.comuna,
      rol: this.rol,
      subRol: this.subRol
    });

  }

  ngOnInit() {
    this.contribucionesBuscarRolService.getComunas().then((data) => {
      this.localidad = data;
    }, () => {
      this.mdlSnackbarService.showSnackbar({
        message: 'Ocurrió un error al obtener las comunas',
        timeout: 1500,
        action: {
          handler: () => {
          },
          text: 'ok'
        }
      });
    });
  }

  autoCompletarComuna(): void {

  }

  buscar(): void {

    console.log(this.comuna.value);
    console.log(this.rol.value);
    console.log(this.subRol.value);
    this.contribucionesBuscarRolService.searchRolesForIds(this.comuna.value, this.rol.value, this.subRol.value).then((response) => {
      if (response === null) {
        console.log('No se encontro respuesta');
      } else {
        console.log(response);
      }
    });
  }
}
