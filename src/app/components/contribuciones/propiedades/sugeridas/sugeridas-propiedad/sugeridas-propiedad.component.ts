import {Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Propiedad} from '../../../../../domain/Propiedad';
import {ListadoPropiedadRolComponent} from '../../../listado/listado-propiedad-rol/listado-propiedad-rol.component';

@Component({
  selector: 'app-sugeridas-propiedad',
  templateUrl: './sugeridas-propiedad.component.html',
  styleUrls: ['./sugeridas-propiedad.component.scss']
})
export class SugeridasPropiedadComponent implements OnInit {

  @Input()
  propiedad: Propiedad;

  @ViewChildren(ListadoPropiedadRolComponent, {read: ElementRef})
  rolElementRefList: QueryList<ElementRef>;

  @ViewChild('grid')
  grid: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }


  resizeAllGridItems(): void {
    if (this.rolElementRefList) {
      this.rolElementRefList.forEach(
        (item) => this.resizeGridItem(item)
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
}
