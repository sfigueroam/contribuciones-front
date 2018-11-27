import {Component, OnInit} from '@angular/core';
import {ContribucionesBuscarRolService} from '../../../../services/contribuciones-buscar-rol.service';
import {Localidad} from '../../../../domain/Localidad';
import {MdlSnackbarService} from '@angular-mdl/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Propiedad} from '../../../../domain/Propiedad';
import {TipoPropiedad} from '../../../../domain/TipoPropiedad';
import {Direccion} from '../../../../domain/Direccion';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-agregar-nueva',
  templateUrl: './agregar-nueva.component.html',
  styleUrls: ['./agregar-nueva.component.scss']
})
export class AgregarNuevaComponent implements OnInit {

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

  constructor(private contribucionesBuscarRolService: ContribucionesBuscarRolService,
              private mdlSnackbarService: MdlSnackbarService) {

    this.comuna = new FormControl('', Validators.required);
    this.rol = new FormControl('', Validators.required);
    this.subRol = new FormControl('', Validators.required);
    this.formRol = new FormGroup({
      comuna: this.comuna,
      rol: this.rol,
      subRol: this.subRol
    });


    this.comunaDireccion = new FormControl('', Validators.required);
    this.tipoPropiedad = new FormControl('', Validators.required);

    const validatorsDireccion = Validators.compose([
      Validators.minLength(2),
      Validators.required
    ]);
    this.direccion = new FormControl('', validatorsDireccion);

    this.formDireccion = new FormGroup({
      comunaDireccion: this.comunaDireccion,
      tipoPropiedad: this.tipoPropiedad,
      direccion: this.direccion
    });

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
      this.error('Ocurrió un error con tipo de propiedades');
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
      this.error('Ocurrió un error al buscar');
      this.offWait();
    });
  }

  buscarDireccionSugeridos() {
    const size = environment.sizeResultSuggested;
    this.formDireccion
    this.contribucionesBuscarRolService.searchDireccion(this.comunaDireccion.value,
      this.tipoPropiedad.value,
      this.direccion.value,
      size).then((lista) => {
        this.direcciones = lista;
      },
      () => {
        this.error('A ocurrido un error al buscar');
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
    if (event.keyCode === 13) {
      this.searchDireccion = false;
    } else {
      this.searchDireccion = true;
      if (this.direccion.value.length > 2) {
        this.buscarDireccionSugeridos();
      } else {
        this.direcciones = null;
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
    this.searchDireccion = false;
    const size = environment.sizeResultPage;
    this.contribucionesBuscarRolService.searchDireccion(this.comunaDireccion.value,
      this.tipoPropiedad.value,
      this.direccion.value,
      size).then((lista) => {
        for (let dir of lista){
          console.log(dir);

        }
      },
      () => {
        this.error('A ocurrido un error al buscar');
      });
  }

  autoCompletarPropiedad() {
    this.buscarDireccionSugeridos();
  }

  autoCompletarComuna() {
    this.buscarDireccionSugeridos();
  }
}
