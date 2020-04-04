import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {Propiedad} from '../../../../../domain/Propiedad';
import {MdlDialogService, MdlSnackbarService} from '@angular-mdl/core';
import {UserService} from '../../../../../services/user.service';
import {environment} from '../../../../../../environments/environment';
import {RolCuotasComponent} from '../rol-cuotas/rol-cuotas.component';
import { UserDataService } from 'src/app/user-data.service';

@Component({
  selector: 'app-direccion-cuotas',
  templateUrl: './direccion-cuotas.component.html',
  styleUrls: ['./direccion-cuotas.component.scss']
})
export class DireccionCuotasComponent implements OnInit {

  @ViewChildren(RolCuotasComponent)
  rolCuotasComponentList: QueryList<RolCuotasComponent>;

  @Input()
  propiedad: Propiedad;
  @Output()
  change: EventEmitter<any> = new EventEmitter();

  comuna: string;

  expanded: boolean;

  constructor(private user: UserService,
              private dialogService: MdlDialogService,
              private mdlSnackbarService: MdlSnackbarService,
              private userdataservice: UserDataService) {
  }

  ngOnInit() {
    this.expanded = true;

    this.comuna = this.propiedad.roles[0].comuna;
  }

  onChange() {
    this.change.emit();
  }

  toggle() {
    this.expanded = !this.expanded;
  }

  delete() {
    if (this.propiedad.isComplete) {
      this.dialogService.confirm(
        'Eliminarás el ROL completo, ¿estás seguro/a?',
        'CANCELAR',
        'ELIMINAR').subscribe(
        () => {
          //this.userdataservice.setContador();
          this.userdataservice.setMensaje(false);
          this.user.eliminarPropiedad(this.propiedad.idDireccion).then(
            () => this.mdlSnackbarService.showToast('Dirección eliminada.', environment.snackbarTime),
            err => {
              console.log(err);
              this.mdlSnackbarService.showToast('Ocurrió un error al eliminar la dirección.', environment.snackbarTime);
            }
          );
        }
      );
    } else {
      this.mdlSnackbarService.showToast('Por favor espera un momento, estamos cargando la información de tus cuotas',
        environment.snackbarTime);
    }
  }

  public abrirPrimerRol(): void {
    const rolCuotasList = this.rolCuotasComponentList.toArray();
    if (rolCuotasList !== undefined && rolCuotasList.length > 0) {
      rolCuotasList[0].expanded = true;
    }


  }
}
