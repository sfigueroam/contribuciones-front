import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cuota} from '../../../../domain/Cuota';
import {TipoCuota} from '../../../../domain/TipoCuota';
import {Rol} from '../../../../domain/Rol';

@Component({
  selector: 'app-listado-propiedad-rol-cuotas',
  templateUrl: './listado-propiedad-rol-cuotas.component.html',
  styleUrls: ['./listado-propiedad-rol-cuotas.component.scss']
})
export class ListadoPropiedadRolCuotasComponent implements OnInit {

  @Input()
  rol: Rol;
  @Input()
  year: number;

  cuotas: Cuota[];

  @Output()
  change: EventEmitter<any> = new EventEmitter();
  @Output()
  reliquidar: EventEmitter<any> = new EventEmitter();

  selectedIcon: string;

  constructor() {
  }

  ngOnInit() {
    this.initCuotas();
    this.reloadChecked();
  }


  private initCuotas(): void {
    if (this.year) {
      this.cuotas = this.rol.cuotas.get(this.year);
    } else {
      this.cuotas = this.rol.allCuotas();
    }
  }

  cuotaIcon(cuota: Cuota): string {
    return cuota.intencionPago ? 'checked' : 'unchecked';
  }

  selectAllNone(): void {
    if (this.selectedIcon === 'checked') {
      this.rol.seleccionar(TipoCuota.NINGUNA, this.year);
    } else {
      this.rol.seleccionar(TipoCuota.TODAS, this.year);
    }
    this.reloadChecked();
    this.reliquidar.emit();
  }

  checkCuota(cuota: Cuota) {
    cuota.intencionPago = !cuota.intencionPago;
    this.reliquidar.emit(cuota);
    this.reloadChecked();

  }

  public reloadChecked(): void {
    if (this.rol.allChecked(this.year)) {
      this.selectedIcon = 'checked';
    } else if (this.rol.noneChecked(this.year)) {
      this.selectedIcon = 'unchecked';
    } else {
      this.selectedIcon = 'indeterminate_check_box';
    }

  }

  update(): void {
    this.initCuotas();
    this.reloadChecked();
    this.change.emit();
    this.rol.wait = false;
  }
}
