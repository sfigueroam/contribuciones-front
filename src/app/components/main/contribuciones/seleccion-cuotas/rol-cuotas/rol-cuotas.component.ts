import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Rol} from '../../../../../domain/Rol';
import {Cuota} from '../../../../../domain/Cuota';
import {TipoCuota} from '../../../../../domain/TipoCuota';
import {CheckboxIcon} from '../../../../../domain/CheckboxIcon';
import {MdlDialogService, MdlSnackbarService} from '@angular-mdl/core';
import {UserService} from '../../../../../services/user.service';

@Component({
  selector: 'app-rol-cuotas',
  templateUrl: './rol-cuotas.component.html',
  styleUrls: ['./rol-cuotas.component.scss']
})
export class RolCuotasComponent implements OnInit {

  @Input()
  rol: Rol;
  @Output()
  change: EventEmitter<any> = new EventEmitter();

  expanded: boolean;
  icon: string;

  // tabla de cuotas
  selectedIcon: CheckboxIcon;
  icons = CheckboxIcon;

  constructor(private user: UserService,
              private dialogService: MdlDialogService,
              private mdlSnackbarService: MdlSnackbarService) {
  }

  ngOnInit() {
    this.expanded = false;
    this.icon = this.rol.icon();
    this.selectedIcon = CheckboxIcon.SELECTED;

    this.rol.completeStream.subscribe(
      () => null,
      (err) => console.log(err),
      () => {
        this.rol.changeStream.subscribe(
          () => this.reloadChecked()
        );
      }
    );
  }

  toggle() {
    if (this.rol.isComplete) {
      this.expanded = !this.expanded;
    } else {
      this.mdlSnackbarService.showToast('Por favor espera un momento, estamos cargando la información de tus cuotas', 1400);
    }
  }

  private reloadChecked(): void {
    if (this.rol.allChecked()) {
      this.selectedIcon = CheckboxIcon.SELECTED;
    } else if (this.rol.noneChecked()) {
      this.selectedIcon = CheckboxIcon.UNSELECTED;
    } else {
      this.selectedIcon = CheckboxIcon.INDETERMINATE;
    }
    this.change.emit();
  }

  selectAllNone(): void {
    if (this.selectedIcon === CheckboxIcon.SELECTED) {
      this.rol.seleccionar(TipoCuota.NINGUNA);
    } else {
      this.rol.seleccionar(TipoCuota.TODAS);
    }
  }

  checkCuota(cuota: Cuota) {
    cuota.changeIntencionPago();
  }

  delete() {
    if (this.rol.isComplete) {
      this.dialogService.confirm(
        'Eliminarás el ROL completo',
        'CANCELAR',
        'ELIMINAR').subscribe(
        () => {
          this.user.eliminarRol(this.rol.rolComunaSiiCod, this.rol.rolId, this.rol.subrolId).then(
            () => this.mdlSnackbarService.showToast('Rol eliminado', 1400),
            err => {
              console.log(err);
              this.mdlSnackbarService.showToast('Ocurrió un error al eliminar la dirección', 1400);
            }
          );
        }
      );
    } else {
      this.mdlSnackbarService.showToast('Por favor espera un momento, estamos cargando la información de tus cuotas', 1400);
    }
  }
}
