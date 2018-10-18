import {AfterViewChecked, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Rol} from '../../../../domain/Rol';

@Component({
  selector: 'app-listado-propiedad-rol',
  templateUrl: './listado-propiedad-rol.component.html',
  styleUrls: ['./listado-propiedad-rol.component.scss']
})
export class ListadoPropiedadRolComponent implements OnInit, AfterViewChecked {

  @Input()
  rol: Rol;

  @Output()
  onResize: EventEmitter<any> = new EventEmitter();

  selectedYear: number;

  constructor() {
  }

  ngOnInit() {
    this.selectedYear = this.rol.getYears()[0];
  }

  isActive(year: number): boolean {
    return year === this.selectedYear;
  }

  activateTab(year: number) {
    this.selectedYear = year;
  }

  ngAfterViewChecked(): void {
    this.onResize.emit();
    // TODO eliminar este workaround
    setTimeout(
      () => {this.onResize.emit();},
      500
    );
  }
}
