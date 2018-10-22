import {AfterViewChecked, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Rol} from '../../../../domain/Rol';
import {Cuota} from '../../../../domain/Cuota';
import {TipoCuota} from '../../../../domain/TipoCuota';

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

  showSuggestion: boolean;
  selectedYear: number;

  selectedIconMap: Map<number, string>;

  constructor() {
    this.selectedIconMap = new Map<number, string>();
  }

  ngOnInit() {
    this.selectedYear = this.rol.getYears()[0];

    for (const year of this.rol.getYears()) {
      this.updateYear(year);
    }

    this.showSuggestion = this.rol.hasExpiredQuotes();
  }

  selectAllNone(year: number): void {
    if (this.selectedIconMap.get(year) === 'check_box') {
      this.rol.seleccionar(TipoCuota.NINGUNA, year);
    } else {
      this.rol.seleccionar(TipoCuota.TODAS, year);
    }
    this.updateYear(year);
  }

  updateYear(aYear?: number): void {
    let yearList = [];
    if (aYear) {
      yearList.push(aYear);
    } else {
      yearList = this.rol.getYears();
    }

    for (const year of yearList) {
      if (this.rol.allChecked(year)) {
        this.selectedIconMap.set(year, 'checked');
      } else if (this.rol.noneChecked(year)) {
        this.selectedIconMap.set(year, 'unchecked');
      } else {
        this.selectedIconMap.set(year, 'indeterminate_check_box');
      }
    }

    this.change.emit();
  }

  checkCuota(year: number, cuota: Cuota) {
    cuota.checked = !cuota.checked;
    this.updateYear(year);
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

  cuotaIcon(cuota: Cuota): string {
    return cuota.checked ? 'checked' : 'unchecked';
  }

  seleccionar(tipo: TipoCuota): void {
    this.rol.seleccionar(tipo);
    this.updateYear();
  }
}
