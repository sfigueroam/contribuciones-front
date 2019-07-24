import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DFServicio } from '../../../domain/DFServicio';
import { CheckboxIcon } from '../../../domain/CheckboxIcon';
import { MdlDialogService } from '@angular-mdl/core';
import { UserService } from '../../../services/user.service';




@Component({
  selector: 'app-deuda-fiscal-servicio',
  templateUrl: './deuda-fiscal-servicio.component.html',
  styleUrls: ['./deuda-fiscal-servicio.component.scss']
})

export class DeudaFiscalServicioComponent implements OnInit {


  @Input() servicio: DFServicio;

  @Output() change: EventEmitter<any> = new EventEmitter();

  expanded: boolean;

  constructor( private user: UserService,
               private dialogService: MdlDialogService, ) { }


  ngOnInit() {
  }


  toggle() {
    this.expanded = !this.expanded;
  }


  onChange() {
    this.change.emit();
  }


  delete() {
    // if (this.servicio.isComplete) {

    //   this.dialogService.confirm(
    //     'Eliminarás el ROL completo, ¿estás seguro/a?',
    //     'CANCELAR',
    //     'ELIMINAR').subscribe(
    //     () => {
    //       this.user.eliminarPropiedad(this.propiedad.idDireccion).then(
    //         () => this.mdlSnackbarService.showToast('Dirección eliminada.', environment.snackbarTime),
    //         err => {
    //           console.log(err);
    //           this.mdlSnackbarService.showToast('Ocurrió un error al eliminar la dirección.', environment.snackbarTime);
    //         }
    //       );
    //     }
    //   );

    // } else {
    //   this.mdlSnackbarService.showToast('Por favor espera un momento, estamos cargando la información de tus cuotas',
    //     environment.snackbarTime);
    // }
  }

}
