import {AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Propiedad} from '../../../../domain/Propiedad';
import {ListadoPropiedadRolComponent} from '../listado-propiedad-rol/listado-propiedad-rol.component';

@Component({
  selector: 'app-listado-propiedad',
  templateUrl: './listado-propiedad.component.html',
  styleUrls: ['./listado-propiedad.component.scss']
})
export class ListadoPropiedadComponent implements OnInit, AfterViewInit {

  @Input()
  propiedad: Propiedad;

  @ViewChild('grid')
  grid: ElementRef;

  @ViewChildren(ListadoPropiedadRolComponent, {read: ElementRef})
  items: QueryList<ElementRef>;

  constructor() {
  }

  ngAfterViewInit() {
    console.log(this.grid);
    console.log(this.items);

    this.resizeAllGridItems();
  }

  ngOnInit() {
  }

  resizeGridItem(item: ElementRef): void {
    const rowHeight = parseInt(getComputedStyle(this.grid.nativeElement).getPropertyValue('grid-auto-rows'), 10);
    const rowGap = parseInt(getComputedStyle(this.grid.nativeElement).getPropertyValue('grid-row-gap'), 10);
    const rowSpan = Math.ceil((item.nativeElement.querySelector('.content').getBoundingClientRect().height + rowGap)
      / (rowHeight + rowGap));
    item.nativeElement.style.gridRowEnd = 'span ' + rowSpan;
  }

  resizeAllGridItems(): void {
    this.items.forEach(
      (item) => this.resizeGridItem(item)
    );
  }
}
