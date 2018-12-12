import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ContribucionesBuscarRolService} from '../../../../../services/contribuciones-buscar-rol.service';
import {Localidad} from '../../../../../domain/Localidad';
import {MdlSnackbarService} from '@angular-mdl/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Propiedad} from '../../../../../domain/Propiedad';
import {TipoPropiedad} from '../../../../../domain/TipoPropiedad';
import {Direccion} from '../../../../../domain/Direccion';
import {environment} from '../../../../../../environments/environment';
import {PropiedadComponent} from '../../../shared/propiedad/propiedad.component';
import {Rol} from '../../../../../domain/Rol';
import {UserService} from '../../../../../services/user.service';
import {Router} from '@angular/router';
import {ContribucionesService} from '../../../../../services/contribuciones.service';

@Component({
  selector: 'app-agregar-nueva',
  templateUrl: './agregar-nueva.component.html',
  styleUrls: ['./agregar-nueva.component.scss']
})
export class AgregarNuevaComponent implements OnInit {


  @ViewChildren(PropiedadComponent)
  propiedadComponentList: QueryList<PropiedadComponent>;

  wait = false;
  sinResultado = false;
  searchDireccion = false;

  localidad: Localidad[];
  tipoPropiedades: TipoPropiedad[];
  direcciones: Direccion[];
  direccionModel: string;


  formRol: FormGroup;
  formDireccion: FormGroup;

  comuna: FormControl;
  rol: FormControl;
  subRol: FormControl;

  tipoPropiedad: FormControl;
  direccion: FormControl;

  propiedades: Propiedad[];
  switchActive = 'direccion';
  busquedaEnEjecucion = false;

  cantidadSeleccionadas: number;
  hidden: boolean;

  inputDireccionesTmp = '';

  constructor(private contribucionesBuscarRol: ContribucionesBuscarRolService,
              private mdlSnackbarService: MdlSnackbarService,
              private user: UserService,
              private router: Router,
              private contribuciones: ContribucionesService) {

    this.comuna = new FormControl('', Validators.required);
    this.rol = new FormControl('', Validators.required);
    this.subRol = new FormControl('', Validators.required);
    this.formRol = new FormGroup({
      comuna: this.comuna,
      rol: this.rol,
      subRol: this.subRol
    });

    this.cantidadSeleccionadas = 0;

    this.tipoPropiedad = new FormControl('');

    const validatorsDireccion = Validators.compose([
      Validators.minLength(3),
      Validators.required
    ]);
    this.direccion = new FormControl('', validatorsDireccion);

    this.formDireccion = new FormGroup({
      tipoPropiedad: this.tipoPropiedad,
      direccion: this.direccion
    });


    this.hidden = true;
  }

  updateSeleccionadaTotal(): void {
    this.totalSeleccionadas();
  }

  totalSeleccionadas(): void {
    this.cantidadSeleccionadas = 0;
    const propiedadesComponent = this.propiedadComponentList.toArray();
    for (const pripedadComponent of propiedadesComponent) {
      this.cantidadSeleccionadas = this.cantidadSeleccionadas + pripedadComponent.getCantidadRolesSeleccionadas();
    }
  }

  ngOnInit() {
    this.contribucionesBuscarRol.getComunas().then((data) => {
      this.localidad = data;
    }, () => {
      this.error('Ocurrió un error al obtener las comunas');
    });

    this.contribucionesBuscarRol.getTiposPropiedades().then((data) => {
      this.tipoPropiedades = data;
    }, () => {
      this.error('Ocurrió un error al obtener los tipos de propiedades');
    });
  }

  buscarRol(): void {

    this.onWait();
    this.contribucionesBuscarRol.searchRolesForIds(this.comuna.value, this.rol.value, this.subRol.value).then((response) => {
      if (response === null) {
        this.sinResultado = true;
      } else {
        this.agregarPropiedad(response);
      }
      this.offWait();
    }, () => {
      this.error('Ocurrió un error al buscar direcciones');
      this.offWait();
    });
  }

  buscarDireccionSugeridos() {
    this.inputDireccionesTmp = this.direccion.value;
    const size = environment.sizeResultSuggested;
    this.contribucionesBuscarRol.searchDireccion(undefined,
      this.tipoPropiedad.value,
      this.direccion.value,
      size).then((lista) => {
        this.direcciones = lista;
      },
      err => {
        this.error(err);
      });
  }

  onWait(): void {
    this.sinResultado = false;
    this.wait = true;
  }

  offWait(): void {
    this.wait = false;
  }

  changeSwith(active: string) {
    this.switchActive = active;
  }

  inputDirecciones(event: any) {
    const inp = String.fromCharCode(event.keyCode);
    if (this.direccion.value.length <= 2) {
      this.direcciones = null;
      this.inputDireccionesTmp = '';
    } else if (event.keyCode === 13) {
      this.searchDireccion = false;
    } else if (/[a-zA-Z0-9-_ ]/.test(inp) || event.keyCode === 8 || this.direccion.value !== this.inputDireccionesTmp) {
      this.searchDireccion = true;
      if (this.direccion.value.length > 2) {
        if (!this.busquedaEnEjecucion) {
          this.busquedaEnEjecucion = true;
          setTimeout(
            () => {
              this.buscarDireccionSugeridos();
              this.busquedaEnEjecucion = false;
            },
            800);
        }
      }
    }
  }


  private agregarPropiedad(response: Propiedad) {
    if (this.propiedades === undefined || this.propiedades == null) {
      this.propiedades = [];
    }
    let estado = false;
    for (const prop of this.propiedades) {
      if (prop.idDireccion === response.idDireccion) {
        estado = true;
        for (const rol of response.roles) {
          if (!prop.existRol(rol.rol)) {
            prop.addRol(rol);
          }
        }
      }
    }

    if (!estado) {
      this.propiedades.push(response);
    }
  }

  private error(msg: string) {
    this.mdlSnackbarService.showSnackbar({
      message: msg,
      timeout: 1500,
      action: {
        handler: () => {
        },
        text: 'ok'
      }
    });
  }

  buscarDireccion() {
    this.onWait();
    this.searchDireccion = false;
    const size = environment.sizeResultPage;
    this.contribucionesBuscarRol.searchDireccion(undefined,
      this.tipoPropiedad.value,
      this.direccion.value,
      size).then((lista) => {
        this.direcciones = lista;
        this.agregarDireccionesAPropiedad();
        this.offWait();

      },
      () => {
        this.error('A ocurrido un error al buscar una propiedad');
      });
  }

  autoCompletarPropiedad() {
    this.buscarDireccionSugeridos();
  }

  agregarDireccionesAPropiedad(): void {
    const propiedads = this.contribucionesBuscarRol.direccionToPropiedad(this.direcciones);
    if (propiedads) {
      for (const pro of propiedads) {
        this.agregarPropiedad(pro);
      }
    }
  }

  asociarPropiedades() {
    this.hidden = false;

    if (this.user.rut != null && this.user.rut !== undefined) {
      let roles: Rol[] = [];
      const propiedadesComponent = this.propiedadComponentList.toArray();
      for (const propiedadComponent of propiedadesComponent) {
        const rolesSeleccionados = propiedadComponent.getRolesSeleccioados();
        if (rolesSeleccionados !== undefined) {
          roles = roles.concat(rolesSeleccionados);
        }
      }

      if (roles.length > 0) {
        this.user.asociarRoles(roles.map(r => r.rol)).then(() => {
            this.contribuciones.propiedades = undefined;
            this.router.navigate(['/main/contribuciones/seleccionar-cuotas']);
          },
          err => {
            this.hidden = true;
            console.error(err);
            this.error('Ocurrio un error al asociar los roles, intente más tarde');
          });
      } else {
        this.hidden = true;
      }
    } else {
      const propiedadesConRolesSeleccionados = this.getPropiedadesConRolesSeleccionados();

      for (const propiedad of propiedadesConRolesSeleccionados) {
        this.contribuciones.addPropiedad(propiedad);
      }
      this.router.navigate(['/main/contribuciones/seleccionar-cuotas']);
    }
  }

  private getPropiedadesConRolesSeleccionados(): Propiedad[] {
    const listaPropiedades = [];
    const propiedadesComponent = this.propiedadComponentList.toArray();
    for (const propiedadComponent of propiedadesComponent) {
      const rolesSeleccionados = propiedadComponent.getRolesSeleccioados();
      if (rolesSeleccionados !== undefined) {
        const propiedad = propiedadComponent.propiedad;
        propiedad.roles = rolesSeleccionados;
        listaPropiedades.push(propiedad);
      }
    }
    return listaPropiedades;
  }

  volver() {
    this.router.navigate(['/main/contribuciones/seleccionar-cuotas']);
  }
}
