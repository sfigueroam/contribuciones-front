import {Component, OnInit} from '@angular/core';
import {ContribucionesBuscarRolService} from '../../../../services/contribuciones-buscar-rol.service';
import {Localidad} from '../../../../domain/Localidad';
import {MdlSnackbarService} from '@angular-mdl/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Propiedad} from '../../../../domain/Propiedad';
import {TipoPropiedad} from '../../../../domain/TipoPropiedad';

@Component({
  selector: 'app-agregar-nueva',
  templateUrl: './agregar-nueva.component.html',
  styleUrls: ['./agregar-nueva.component.scss']
})
export class AgregarNuevaComponent implements OnInit {

  wait: boolean = false;
  sinResultado: boolean = false;

  localidad: Localidad[];
  tipoPropiedades: TipoPropiedad[];
  form: FormGroup;
  comuna: FormControl;
  rol: FormControl;
  subRol: FormControl;

  tipoPropiedad: FormControl;

  propiedades: Propiedad[];

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

    this.tipoPropiedad = new FormControl('', Validators.required);

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

    this.contribucionesBuscarRolService.getTiposPropiedades().then((data) => {
      this.tipoPropiedades = data;
    }, () => {
      this.mdlSnackbarService.showSnackbar({
        message: 'Ocurrió un error con tipo de propiedades',
        timeout: 1500,
        action: {
          handler: () => {
          },
          text: 'ok'
        }
      });
    });
  }

  autoCompletar(): void {}

  buscar(): void {

    console.log(this.comuna.value);
    console.log(this.rol.value);
    console.log(this.subRol.value);
    this.onWait();
    this.contribucionesBuscarRolService.searchRolesForIds(this.comuna.value, this.rol.value, this.subRol.value).then((response) => {
      if (response === null) {
        this.sinResultado = true;
      } else {
        this.propiedades = [];
        this.propiedades.push(response);
        console.log(response);
      }
      this.offWait();
    },() => {
      this.mdlSnackbarService.showSnackbar({
        message: 'Ocurrió un error al buscar',
        timeout: 1500,
        action: {
          handler: () => {
          },
          text: 'ok'
        }
      });
      this.offWait();
    });
  }

  onWait(): void {
    this.sinResultado = false;
    this.wait = true;
  }

  offWait(): void {
    this.wait = false;
  }
}
