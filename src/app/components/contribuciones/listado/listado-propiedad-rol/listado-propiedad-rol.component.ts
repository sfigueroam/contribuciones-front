import {AfterViewChecked, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {Rol} from '../../../../domain/Rol';
import {TipoCuota} from '../../../../domain/TipoCuota';
import {ListadoPropiedadRolCuotasComponent} from '../listado-propiedad-rol-cuotas/listado-propiedad-rol-cuotas.component';

@Component({
  selector: 'app-listado-propiedad-rol',
  templateUrl: './listado-propiedad-rol.component.html',
  styleUrls: ['./listado-propiedad-rol.component.scss']
})
export class ListadoPropiedadRolComponent implements OnInit, AfterViewChecked {

  @Input()
  rol: Rol;

  @Output()
  resize: EventEmitter<any> = new EventEmitter();
  @Output()
  change: EventEmitter<any> = new EventEmitter();

  @ViewChildren(ListadoPropiedadRolCuotasComponent)
  cuotaComponentList: QueryList<ListadoPropiedadRolCuotasComponent>;

  showTabs: boolean;
  porEliminar: boolean;
  showSuggestion: boolean;
  selectedYear: number;

  tipos: Array<TipoCuota>;

  total: number;
  condonacion: number;
  cuotasTotal: number;
  cuotasSeleccionadas: number;

  constructor() {
    this.porEliminar = false;
  }

  ngOnInit() {
    this.selectedYear = this.rol.getYears()[0];

    this.showSuggestion = this.rol.hasExpiredQuotes();
    this.actualizarTipoTotal();
  }

  actualizarTipoTotal(): void {
    this.total = this.rol.calcularTotal();
    this.condonacion = this.rol.calcularCondonacion();
    this.tipos = this.rol.calcularTipo();
    this.cuotasTotal = this.rol.cantidadCuotas();
    this.cuotasSeleccionadas = this.rol.cantidadCuotasSeleccionadas();
    this.change.emit();

    this.showTabs = this.cuotasTotal > 8;
  }

  isActive(year: number): boolean {
    return year === this.selectedYear;
  }

  activateTab(year: number) {
    this.selectedYear = year;
  }

  ngAfterViewChecked(): void {
    this.resize.emit();
  }

  seleccionar(tipo: TipoCuota): void {
    this.rol.seleccionar(tipo);
    for (const cuotaComponent of this.cuotaComponentList.toArray()) {
      cuotaComponent.update();
    }
  }
}
