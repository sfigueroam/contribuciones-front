import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {MdlSnackbarService} from '@angular-mdl/core';
import {UserService} from '../../../services/user.service';
import {Propiedad} from '../../../domain/Propiedad';
import {PropiedadComponent} from '../shared/propiedad/propiedad.component';
import {Rol} from '../../../domain/Rol';
import {CheckboxIcon} from '../../../domain/CheckboxIcon';
import {CertificadosService} from '../../../services/certificados.service';
import {Router} from '@angular/router';

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

  constructor(private user: UserService,
              private mdlSnackbarService: MdlSnackbarService,
              private certificados: CertificadosService,
              private router: Router) {
    this.anos = [];
    for (let ano = (new Date()).getFullYear(); ano >= environment.certificados.anoDesde; ano--) {
      this.anos.push(ano);
    }

    this.certificadoDeudas = true;
    this.historialPagos = false;
    this.seleccionados = 0;
  }

  ngOnInit() {
    this.user.getBienesRaices().then(
      (propiedades) => {
        this.propiedades = propiedades;
        this.actualizarSeleccionadas();
      },
      (err) => {
        console.log(err);
        this.mdlSnackbarService.showToast('Ocurrió un error al obtener el listado de propiedades');
      }
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
    this.certificados.ano = this.ano;
    this.certificados.historialPago = this.historialPagos;
    this.certificados.certificadoDeuda = this.certificadoDeudas;
    this.certificados.roles = [];
    for (const rol of this.roles) {
      if (rol) {
        this.certificados.roles.push(rol.rol);
      }
    }
    this.router.navigate(['/main/contribuciones/certificados/obtener']);
  }

  volver(): void {
    this.router.navigate(['/main/contribuciones/seleccionar-cuotas']);
  }
}
