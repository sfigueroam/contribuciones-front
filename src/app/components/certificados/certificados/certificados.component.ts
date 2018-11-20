import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {ContributionsService} from '../../../services/contributions.service';
import {MdlSnackbarService} from '@angular-mdl/core';
import {PitValidators} from '../../../pit-validators';
import {ControlHelper, Helper} from '../../../domain/CertificadosHelpers';

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.component.html',
  styleUrls: ['./certificados.component.scss']
})
export class CertificadosComponent implements OnInit {

  form: FormGroup;
  deudas: FormControl;
  pagos: FormControl;
  ano: FormControl;
  email: FormControl;

  anos: number[];

  seleccionados: number;

  helpers: Helper[];

  constructor(private contributions: ContributionsService, private mdlSnackbarService: MdlSnackbarService) {
    this.deudas = new FormControl();
    this.pagos = new FormControl();
    this.ano = new FormControl();
    this.email = new FormControl('', [Validators.email, Validators.required]);
    this.form = new FormGroup({
      deudas: this.deudas,
      pagos: this.pagos,
      ano: this.ano,
      email: this.email,
    });

    this.anos = [];
    for (let ano = (new Date()).getFullYear(); ano >= environment.certificados.anoDesde; ano--) {
      this.anos.push(ano);
    }

    this.seleccionados = 0;
  }

  ngOnInit() {
    this.contributions.getBienesRaices().then(
      (propiedades) => {
        const rolesControlNames = [];

        this.helpers = [];
        propiedades.forEach(
          p => {
            const controls = [];
            p.roles.forEach(
              r => {
                const control = new ControlHelper({rol: r, control: new FormControl(true), icon: r.icon()});
                const controlName = 'ROL' + r.rol;
                this.form.addControl(controlName, control.control);
                rolesControlNames.push(controlName);
                controls.push(control);
              }
            );
            this.helpers.push(new Helper({propiedad: p, controls: controls, selected: true}));
          }
        );

        this.form.setValidators([
          PitValidators.atLeastOneChecked(['deudas', 'pagos']),
          PitValidators.atLeastOneChecked(rolesControlNames),
          PitValidators.dependency('pagos', 'ano')
        ]);

        this.actualizarCantidad();
      },
      () => this.mdlSnackbarService.showToast('Ocurrió un error al obtener el listado de propiedades')
    );
  }

  validarDireccion(helper: Helper) {
    let seleccionados = 0;
    helper.controls.forEach(
      c => {
        if (c.control.value) {
          seleccionados++;
        }
      }
    );

    if (seleccionados === 0) {
      helper.icon = 'check_box_outline_blank';
    } else if (seleccionados === helper.controls.length) {
      helper.icon = 'check_box';
    } else {
      helper.icon = 'indeterminate_check_box';
    }
    this.actualizarCantidad();
  }

  seleccionarPropiedad(helper: Helper) {
    let value: boolean;
    if (helper.icon === 'check_box') {
      helper.icon = 'check_box_outline_blank';
      value = false;
    } else {
      helper.icon = 'check_box';
      value = true;
    }
    helper.controls.forEach(
      helperControl => helperControl.control.setValue(value)
    );
    this.actualizarCantidad();
  }

  actualizarCantidad() {
    let seleccionados = 0;
    this.helpers.forEach(
      helper => helper.controls.forEach(
        control => {
          if(control.control.value){
            seleccionados++;
          }
        }
      )
    );
    this.seleccionados = seleccionados;
  }

  solicitarCertificado(): void {
  }
}
