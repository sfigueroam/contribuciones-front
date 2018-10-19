import {AfterViewChecked, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Rol} from '../../../../domain/Rol';
import {Cuota} from '../../../../domain/Cuota';

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
      this.rol.checkNone(year);
      this.updateYear(year);
    } else {
      this.rol.checkAll(year);
      this.updateYear(year);
    }
  }

  updateYear(year: number): void {
    if (this.rol.allChecked(year)) {
      this.selectedIconMap.set(year, 'check_box');
    } else if (this.rol.noneChecked(year)) {
      this.selectedIconMap.set(year, 'check_box_outline_blank');
    } else {
      this.selectedIconMap.set(year, 'indeterminate_check_box');
    }
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
    if (cuota.checked) {
      return 'check_box';
    }
    return 'check_box_outline_blank';
  }
}
