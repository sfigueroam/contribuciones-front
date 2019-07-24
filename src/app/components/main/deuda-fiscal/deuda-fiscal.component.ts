import { Component, OnInit } from '@angular/core';
import { DeudaFiscalService } from '../../../services/deuda-fiscal.service';
import { DFServicio } from '../../../domain/DFServicio';
import { DFResumen } from '../../../domain/DFResumen';
import { CheckboxIcon } from '../../../domain/CheckboxIcon';
import { TipoCuota } from '../../../domain/TipoCuota';
import { MdlDialogService } from '@angular-mdl/core';
import { AyudaCondonacionComponent } from '../contribuciones/seleccion-cuotas/modal/ayuda-condonacion/ayuda-condonacion.component';
import { ResumenComponent } from '../contribuciones/seleccion-cuotas/modal/resumen/resumen.component';





@Component({
  selector: 'app-deuda-fiscal',
  templateUrl: './deuda-fiscal.component.html',
  styleUrls: ['./deuda-fiscal.component.scss']
})
export class DeudaFiscalComponent implements OnInit {


  selectedIcon: string;

  complete: boolean;

  result: DFResumen;

  listServicio: DFServicio[] = [];

  existeSoloVencidas = false;

  existeVencidas = false;

  obteniendoDatos = false;

  tipo = TipoCuota;

  seleccionada: TipoCuota = this.tipo.TODAS;

  total: number;

  condonacion: number;



  constructor( private deudaFiscalService: DeudaFiscalService,
               private dialogService: MdlDialogService, ) {

    this.listServicio = deudaFiscalService.getListServicio();

  }

  ngOnInit() {
  }


  seleccionarTodas() {
    if (this.selectedIcon === CheckboxIcon.INDETERMINATE || this.selectedIcon === CheckboxIcon.UNSELECTED) {
      this.seleccionar( TipoCuota.TODAS );
    } else {
      this.seleccionar( TipoCuota.NINGUNA );
    }
  }


  seleccionarTodasVencidas() {
    if (this.selectedIcon === CheckboxIcon.INDETERMINATE || this.selectedIcon === CheckboxIcon.UNSELECTED) {
      this.seleccionar(TipoCuota.TODAS);
    } else {
      this.seleccionar(TipoCuota.NO_VENCIDAS);
    }
  }


  seleccionar(tipo: TipoCuota): void {
    for (const servicio of this.listServicio) {
      servicio.seleccionar( tipo );
    }
    // this.recalcularTipo();
  }


  onChange() {
    // this.recalcularTipo();
  }


  dialogAyudaCondonacion(): void {
    const pDialog = this.dialogService.showCustomDialog({
      component: AyudaCondonacionComponent,
      clickOutsideToClose: true,
      isModal: true
    });
  }


  private openDialogResumen() {
    const pDialog = this.dialogService.showCustomDialog({
      component: ResumenComponent,
      clickOutsideToClose: true,
      // providers: [
      //   {provide: LIST_PROPIEDADES, useValue: this.propiedades},
      //   {provide: CODIGO_LIST_PROPIEDADES, useValue: this.listaContribuciones},
      //   {provide: TOTAL_PROPIEDADES, useValue: this.total},
      //   {provide: CONDONACION_PROPIEDADES, useValue: this.condonacion},
      //   {provide: EXISTE_VENCIDAS, useValue: this.existeVencidas}
      // ],
      classes: 'dialogo-resumen-deudas',
      isModal: true
    });
  }


}
