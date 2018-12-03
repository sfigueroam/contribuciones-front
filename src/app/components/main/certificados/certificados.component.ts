import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {MdlSnackbarService} from '@angular-mdl/core';
import {UserService} from '../../../services/user.service';
import {Propiedad} from '../../../domain/Propiedad';
import {PropiedadComponent} from '../shared/propiedad/propiedad.component';
import {Rol} from '../../../domain/Rol';
import {CheckboxIcon} from '../../../domain/CheckboxIcon';

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.component.html',
  styleUrls: ['./certificados.component.scss']
})
export class CertificadosComponent implements OnInit {

  @ViewChildren(PropiedadComponent)
  propiedadesComponentList: QueryList<PropiedadComponent>;

  propiedades: Propiedad[];

  icons = CheckboxIcon;
  certificadoDeudas: boolean;
  historialPagos: boolean;
  ano: number;
  anos: number[];

  seleccionados: number;
  roles: Rol[];

  constructor(private user: UserService, private mdlSnackbarService: MdlSnackbarService) {
    this.anos = [];
    for (let ano = (new Date()).getFullYear(); ano >= environment.certificados.anoDesde; ano--) {
      this.anos.push(ano);
    }

    this.certificadoDeudas = true;
    this.historialPagos = true;
    this.seleccionados = 0;
  }

  ngOnInit() {
    this.user.getBienesRaices().then(
      (propiedades) => {
        this.propiedades = propiedades;
        this.actualizarSeleccionadas();
      },
      () => this.mdlSnackbarService.showToast('Ocurrió un error al obtener el listado de propiedades')
    );
  }

  actualizarSeleccionadas(): void {
    this.seleccionados = 0;
    this.roles = [];
    for (const pc of this.propiedadesComponentList.toArray()) {
      this.seleccionados += pc.getCantidadRolesSeleccionadas();
      this.roles = this.roles.concat(pc.getRolesSeleccioados());
    }
  }

  solicitarCertificado(): void {
    console.log('Año', this.ano);
    console.log(this.roles);
  }
}
