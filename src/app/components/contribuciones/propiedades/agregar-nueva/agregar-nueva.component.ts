import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ContribucionesBuscarRolService} from '../../../../services/contribuciones-buscar-rol.service';
import {Localidad} from '../../../../domain/Localidad';
import {MdlSnackbarService} from '@angular-mdl/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Propiedad} from '../../../../domain/Propiedad';
import {TipoPropiedad} from '../../../../domain/TipoPropiedad';
import {Direccion} from '../../../../domain/Direccion';
import {environment} from '../../../../../environments/environment';
import {PropiedadComponent} from '../components/propiedad/propiedad.component';
import {Rol} from '../../../../domain/Rol';
import {UserService} from '../../../../services/user.service';
import {Router} from '@angular/router';
import {ContributionsService} from '../../../../services/contributions.service';

@Component({
  selector: 'app-agregar-nueva',
  templateUrl: './agregar-nueva.component.html',
  styleUrls: ['./agregar-nueva.component.scss']
})
export class AgregarNuevaComponent implements OnInit {


  @ViewChildren(PropiedadComponent)
  propiedadComponentList: QueryList<PropiedadComponent>;

  wait: boolean = false;
  sinResultado: boolean = false;
  searchDireccion: boolean = false;

  localidad: Localidad[];
  tipoPropiedades: TipoPropiedad[];
  direcciones: Direccion[];
  direccionModel: string;


  formRol: FormGroup;
  formDireccion: FormGroup;

  comuna: FormControl;
  rol: FormControl;
  subRol: FormControl;

  comunaDireccion: FormControl;
  tipoPropiedad: FormControl;
  direccion: FormControl;

  propiedades: Propiedad[];
  switchActive: string = 'direccion';
  searchDelayedDirecciones: number;

  cantidadSeleccionadas: number;
  hidden: boolean;

  constructor(private contribucionesBuscarRolService: ContribucionesBuscarRolService,
              private mdlSnackbarService: MdlSnackbarService,
              private userService: UserService,
              private router: Router,
              private contributionsService: ContributionsService) {

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
    this.contribucionesBuscarRolService.getComunas().then((data) => {
      this.localidad = data;
    }, () => {
      this.error('Ocurrió un error al obtener las comunas');
    });

    this.contribucionesBuscarRolService.getTiposPropiedades().then((data) => {
      this.tipoPropiedades = data;
    }, () => {
      this.error('Ocurrió un error al obtener los tipos de propiedades');
    });
  }

  autoCompletar(): void {
    console.log('Autocomplet');
  }

  buscarRol(): void {

    this.onWait();
    this.contribucionesBuscarRolService.searchRolesForIds(this.comuna.value, this.rol.value, this.subRol.value).then((response) => {
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
    const size = environment.sizeResultSuggested;
    this.contribucionesBuscarRolService.searchDireccion(undefined,
      this.tipoPropiedad.value,
      this.direccion.value,
      size).then((lista) => {
        this.direcciones = lista;
      },
      () => {
        this.error('A ocurrido un error al buscar direcciones');
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
    console.log(event.keyCode);
    let inp = String.fromCharCode(event.keyCode);
    if (this.direccion.value.length <= 2) {
      this.direcciones = null;
    }
    if (event.keyCode === 13) {
      this.searchDireccion = false;
    } else if (/[a-zA-Z0-9-_ ]/.test(inp) || event.keyCode === 8) {
      this.searchDireccion = true;
      if (this.direccion.value.length > 2) {
        console.log('this.searchDelayedDirecciones', this.searchDelayedDirecciones);
        if (!this.searchDelayedDirecciones) {
          this.searchDelayedDirecciones = setTimeout(
            () => {
              console.log('buscando');
              this.buscarDireccionSugeridos();
              this.searchDelayedDirecciones = undefined;
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
    let estado: boolean = false;
    for (let prop of this.propiedades) {
      if (prop.idDireccion === response.idDireccion) {
        estado = true;
        for (let rol of response.roles) {
          if (!prop.existRol(rol.rol)) {
            console.log('rol No e xiste');
            prop.addRol(rol);
          }
        }
      }
    }

    console.log(estado);

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
    this.contribucionesBuscarRolService.searchDireccion(undefined,
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
    let propiedads = this.contribucionesBuscarRolService.direccionToPropiedad(this.direcciones);
    if (propiedads) {
      for (const pro of propiedads) {
        this.agregarPropiedad(pro);
      }
    }
  }

  asociarPropiedades() {
    this.hidden = false;
    console.log('inicio asociar propiedades');

    if (this.userService.rut != null && this.userService.rut === undefined) {
    //if (this.userService.rut === undefined) {
      let roles: Rol[] = [];
      const propiedadesComponent = this.propiedadComponentList.toArray();
      for (const propiedadComponent of propiedadesComponent) {
        const rolesSeleccionados = propiedadComponent.getRolesSeleccioados();
        if (rolesSeleccionados !== undefined) {
          roles = roles.concat(rolesSeleccionados);
        }
      }

      console.log('roles.loength', roles.length);
      if (roles.length > 0) {
        this.contribucionesBuscarRolService.asociarRoles(this.userService.rut, roles).then(() => {
            this.contributionsService.propiedades = undefined;
            this.router.navigate(['/main/contribuciones']);
          },
          () => {
            this.hidden = true;
            console.error('Ocurrio un error');
            this.error('Ocurrio un error al asociar los roles, intente más tarde');
          });
      } else {
        this.hidden = true;
      }
    } else {
      let propiedadesConRolesSeleccionados = this.getPropiedadesConRolesSeleccionados();

      for (let propiedad of propiedadesConRolesSeleccionados) {
        this.contributionsService.addPropiedad(propiedad);
      }
      this.router.navigate(['/main/contribuciones']);
    }
  }


  private getPropiedadesConRolesSeleccionados(): Propiedad[] {

    let listaPropiedades = [];
    const propiedadesComponent = this.propiedadComponentList.toArray();
    for (const propiedadComponent of propiedadesComponent) {
      const rolesSeleccionados = propiedadComponent.getRolesSeleccioados();
      if (rolesSeleccionados !== undefined) {
        let propiedad = propiedadComponent.propiedad;
        propiedad.roles = rolesSeleccionados;
        listaPropiedades.push(propiedad);
      }
    }

    return listaPropiedades;
  }

}
