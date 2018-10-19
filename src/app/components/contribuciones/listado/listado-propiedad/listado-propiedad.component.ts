import {AfterViewInit, Component, ElementRef, Input, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Propiedad} from '../../../../domain/Propiedad';
import {ListadoPropiedadRolComponent} from '../listado-propiedad-rol/listado-propiedad-rol.component';

@Component({
  selector: 'app-listado-propiedad',
  templateUrl: './listado-propiedad.component.html',
  styleUrls: ['./listado-propiedad.component.scss']
})
export class ListadoPropiedadComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    // TODO eliminar este workaround
    setTimeout(
      () => {
        this.resizeAllGridItems();
      },
      500
    );
  }

  @Input()
  propiedad: Propiedad;

  @ViewChild('grid')
  grid: ElementRef;

  @ViewChildren(ListadoPropiedadRolComponent, {read: ElementRef})
  items: QueryList<ElementRef>;

  constructor() {
  }

  private resizeGridItem(item: ElementRef): void {
    const rowHeight = parseInt(getComputedStyle(this.grid.nativeElement).getPropertyValue('grid-auto-rows'), 10);
    const rowGap = parseInt(getComputedStyle(this.grid.nativeElement).getPropertyValue('grid-row-gap'), 10);
    const rowSpan = Math.ceil((item.nativeElement.querySelector('.content').getBoundingClientRect().height + rowGap)
      / (rowHeight + rowGap));
    item.nativeElement.style.gridRowEnd = 'span ' + rowSpan;
  }

  resizeAllGridItems(): void {
    if (this.items) {
      this.items.forEach(
        (item) => this.resizeGridItem(item)
      );
    }
  }
}
