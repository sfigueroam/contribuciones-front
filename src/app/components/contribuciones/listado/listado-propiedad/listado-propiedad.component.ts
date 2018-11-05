import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren} from '@angular/core';
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

  @Output()
  change: EventEmitter<any> = new EventEmitter();
  @Output()
  disableSuggest: EventEmitter<any> = new EventEmitter();
  @Output()
  block: EventEmitter<boolean> = new EventEmitter();


  @ViewChild('grid')
  grid: ElementRef;

  @ViewChildren(ListadoPropiedadRolComponent, {read: ElementRef})
  rolElementRefList: QueryList<ElementRef>;

  @ViewChildren(ListadoPropiedadRolComponent)
  rolComponentList: QueryList<ListadoPropiedadRolComponent>;

  tipos: Array<TipoCuota>;

  total: number;
  cuotasTotal: number;
  cuotasSeleccionadas: number;

  constructor() {
  }

  disableSuggestion(): void {
    this.disableSuggest.emit();
  }

  ngAfterViewInit(): void {
    // TODO eliminar este workaround
    setTimeout(
      () => {
        this.resizeAllGridItems();
        this.updateTipoTotal();
      },
      700
    );
  }

  actualizarRol(rolId: number): void {
    for (const rolComponent of this.rolComponentList.toArray()) {
      if (rolComponent.rol.rol === rolId) {
        rolComponent.actualizarTipoTotal();
        for (const cuotaComponent of rolComponent.cuotaComponentList.toArray()) {
          cuotaComponent.update();
        }
      }
    }
  }


  public onWait(): void {
    if (this.rolComponentList) {
      this.rolComponentList.forEach(
        (rolComponent) => rolComponent.onWait()
      );
    }
  }

  seleccionar(tipo: TipoCuota): Promise<{}> {
    this.onWait();
    if (this.rolComponentList) {
      return this.reliquidar(tipo, this.rolComponentList.toArray(), 0);
    }
  }

  private reliquidar(tipo: TipoCuota, listadoPropiedadRolComponents: ListadoPropiedadRolComponent[], index: number): Promise<{}> {

    if (index >= listadoPropiedadRolComponents.length) {
      return new Promise((resolve, reject) => {
        resolve();
      });
    } else {
      return new Promise((resolve, reject) => listadoPropiedadRolComponents[index].seleccionar(tipo).then(() => {
          this.reliquidar(tipo, listadoPropiedadRolComponents, (index + 1)).then(() => {
            resolve();
          });
        })
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

  updateTipoTotal(): void {
    if (!this.rolComponentList) {
      return;
    }
    const result = new Map<TipoCuota, number>();
    const rolComponentArray = this.rolComponentList.toArray();
    let total = 0;
    let cuotasTotal = 0;
    let cuotasSeleccionadas = 0;
    for (const rolComponent of rolComponentArray) {
      //total += rolComponent.total - rolComponent.condonacion;
      total += rolComponent.total;
      for (const tipo of rolComponent.tipos) {
        if (result.has(tipo)) {
          result.set(tipo, result.get(tipo) + 1);
        } else {
          result.set(tipo, 1);
        }
      }
      cuotasTotal += rolComponent.cuotasTotal;
      cuotasSeleccionadas += rolComponent.cuotasSeleccionadas;
    }
    this.total = total;
    this.cuotasSeleccionadas = cuotasSeleccionadas;
    this.cuotasTotal = cuotasTotal;

    this.tipos = new Array<TipoCuota>();
    if (result.get(TipoCuota.TODAS) === rolComponentArray.length) {
      this.tipos.push(TipoCuota.TODAS);
    }
    if (result.get(TipoCuota.VIGENTES) === rolComponentArray.length) {
      this.tipos.push(TipoCuota.VIGENTES);
    }
    if (result.get(TipoCuota.VENCIDAS) === rolComponentArray.length) {
      this.tipos.push(TipoCuota.VENCIDAS);
    }
    if (result.get(TipoCuota.NINGUNA) === rolComponentArray.length) {
      this.tipos.push(TipoCuota.NINGUNA);
    }

    this.change.emit();
  }

  getRolComponent(rolId: number) {
    for (const rolComponent of this.rolComponentList.toArray()) {
      if (rolComponent.rol.rol === rolId) {
        return rolComponent;
      }
    }
  }

  blockEvent(event: boolean): void{
    this.block.emit(event);
  }
}
