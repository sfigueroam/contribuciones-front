import {AfterViewInit, Component, ElementRef, Input, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Propiedad} from '../../../../domain/Propiedad';
import {ListadoPropiedadRolComponent} from '../listado-propiedad-rol/listado-propiedad-rol.component';
import {TipoCuota} from '../../../../domain/TipoCuota';

@Component({
  selector: 'app-listado-propiedad',
  templateUrl: './listado-propiedad.component.html',
  styleUrls: ['./listado-propiedad.component.scss']
})
export class ListadoPropiedadComponent implements AfterViewInit {

  @Input()
  propiedad: Propiedad;

  @ViewChild('grid')
  grid: ElementRef;

  @ViewChildren(ListadoPropiedadRolComponent, {read: ElementRef})
  rolElementRefList: QueryList<ElementRef>;

  @ViewChildren(ListadoPropiedadRolComponent)
  rolComponentList: QueryList<ListadoPropiedadRolComponent>;

  constructor() {
  }

  ngAfterViewInit(): void {
    // TODO eliminar este workaround
    setTimeout(
      () => {
        this.resizeAllGridItems();
      },
      500
    );
  }

  seleccionar(tipo: TipoCuota): void {
    if (this.rolComponentList) {
      this.rolComponentList.forEach(
        (rolComponent) => rolComponent.seleccionar(tipo)
      );
    }
  }

  private resizeGridItem(item: ElementRef): void {
    const rowHeight = parseInt(getComputedStyle(this.grid.nativeElement).getPropertyValue('grid-auto-rows'), 10);
    const rowGap = parseInt(getComputedStyle(this.grid.nativeElement).getPropertyValue('grid-row-gap'), 10);
    const rowSpan = Math.ceil((item.nativeElement.querySelector('.content').getBoundingClientRect().height + rowGap)
      / (rowHeight + rowGap));
    item.nativeElement.style.gridRowEnd = 'span ' + rowSpan;
  }

  resizeAllGridItems(): void {
    if (this.rolElementRefList) {
      this.rolElementRefList.forEach(
        (item) => this.resizeGridItem(item)
      );
    }
  }
}
