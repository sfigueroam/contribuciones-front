import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Propiedad} from '../../../../../domain/Propiedad';
import {MdlDialogService, MdlSnackbarService} from '@angular-mdl/core';
import {UserService} from '../../../../../services/user.service';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-direccion-cuotas',
  templateUrl: './direccion-cuotas.component.html',
  styleUrls: ['./direccion-cuotas.component.scss']
})
export class DireccionCuotasComponent implements OnInit {

  @Input()
  propiedad: Propiedad;
  @Output()
  change: EventEmitter<any> = new EventEmitter();

  comuna: string;

  expanded: boolean;

  constructor(private user: UserService,
              private dialogService: MdlDialogService,
              private mdlSnackbarService: MdlSnackbarService) {
  }

  ngOnInit() {
    this.expanded = false;

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
        'Eliminarás la dirección completa',
        'CANCELAR',
        'ELIMINAR').subscribe(
        () => {
          this.user.eliminarPropiedad(this.propiedad.idDireccion).then(
            () => this.mdlSnackbarService.showToast('Dirección eliminada', environment.snackbarTime),
            err => {
              console.log(err);
              this.mdlSnackbarService.showToast('Ocurrió un error al eliminar la dirección', environment.snackbarTime);
            }
          );
        }
      );
    } else {
      this.mdlSnackbarService.showToast('Aún no se carga la información de los roles, espere un momento', environment.snackbarTime);
    }
  }
}
