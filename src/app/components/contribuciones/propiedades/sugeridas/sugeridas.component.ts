import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Propiedad} from '../../../../domain/Propiedad';
import {ContribucionesSugeridasService} from '../../../../services/contribuciones-sugeridas.service';
import {SugeridasPropiedadComponent} from './sugeridas-propiedad/sugeridas-propiedad.component';
import {ContributionsService} from '../../../../services/contributions.service';
import {Router} from '@angular/router';
import {MdlSnackbarService} from '@angular-mdl/core';


@Component({
  selector: 'app-sugeridas',
  templateUrl: './sugeridas.component.html',
  styleUrls: ['./sugeridas.component.scss']
})
export class SugeridasComponent implements OnInit {


  @ViewChildren(SugeridasPropiedadComponent)
  sugeridasPropiedadComponentList: QueryList<SugeridasPropiedadComponent>;

  propiedades: Propiedad[];
  hidden: boolean = false;
  cantidadSeleccionadas: number;


  constructor(private contribucionesSugeridasService: ContribucionesSugeridasService,
              private contributionsService: ContributionsService,
              private mdlSnackbarService: MdlSnackbarService,
              private router: Router) {
    this.propiedades = [];
    this.cantidadSeleccionadas = 0;
  }


  ngOnInit() {
    this.cargarRolesNoAsociados();
  }

  private cargarRolesNoAsociados(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.contribucionesSugeridasService.getRolesNoAsociados().then((rolesNoAsociados) => {
          this.propiedades = rolesNoAsociados;
          this.hidden = true;
          resolve();
        },
        () => {
          reject();
        });
    });

  }


  updateSeleccionadaTotal(): void {
    this.totalSeleccionadas();

  }

  totalSeleccionadas(): void {
    this.cantidadSeleccionadas = 0;
    const sugeridasPropiedades = this.sugeridasPropiedadComponentList.toArray();
    for (const sugeridas of sugeridasPropiedades) {
      this.cantidadSeleccionadas = this.cantidadSeleccionadas + sugeridas.getCantidadRolesSeleccionadas();
    }
    console.log('this.cantidadSeleccionadas', this.cantidadSeleccionadas);
  }

  agregarPropiedad() {

    this.hidden = false;
    let roles: number [] = [];
    const sugeridasPropiedadesList = this.sugeridasPropiedadComponentList.toArray();
    for (const sugeridas of sugeridasPropiedadesList) {
      roles = roles.concat(sugeridas.getRolesSeleccionadas());
    }
    this.contribucionesSugeridasService.asociarRoles(roles).then(() => {
        this.contributionsService.clearPropiedades();
        this.contribucionesSugeridasService.clearPropiedades();
        this.cargarRolesNoAsociados().then(() => {
          this.router.navigate(['/main/contribuciones']);
        });
      },
      () => {
        this.mdlSnackbarService.showSnackbar({
          message: 'Ocurrió un error al asociar',
          timeout: 1500,
          action: {
            handler: () => {},
            text: 'ok'
          }
        });
      });
  }
}
