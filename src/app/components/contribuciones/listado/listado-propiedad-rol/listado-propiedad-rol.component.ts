import {AfterViewChecked, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {Rol} from '../../../../domain/Rol';
import {TipoCuota} from '../../../../domain/TipoCuota';
import {ListadoPropiedadRolCuotasComponent} from '../listado-propiedad-rol-cuotas/listado-propiedad-rol-cuotas.component';
import {ContributionsService} from '../../../../services/contributions.service';
import {ignore} from 'selenium-webdriver/testing';
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
  @Output()
  change: EventEmitter<any> = new EventEmitter();
  @Output()
  disableSuggest: EventEmitter<any> = new EventEmitter();

  @Output()
  blockEvent: EventEmitter<boolean> = new EventEmitter();

  @ViewChildren(ListadoPropiedadRolCuotasComponent)
  cuotaComponentList: QueryList<ListadoPropiedadRolCuotasComponent>;

  showTabs: boolean;
  porEliminar: boolean;
  showSuggestion: boolean;
  selectedYear: number;
  wait: boolean;

  tipos: Array<TipoCuota>;

  total: number;
  condonacion: number;
  cuotasTotal: number;
  cuotasSeleccionadas: number;

  icon: string;

  constructor(private contribucionesService: ContributionsService) {
    this.porEliminar = false;
    this.wait = true;
  }

  iconInit(): void {
    switch (this.rol.idDestPropiedad) {
      case 'A': // AGRICOLA
      case 'B': // AGRICOLA POR ASIMILACION
        this.icon = 'spa';
        break;
      case 'E': // EDUCACION Y CULTURA
        this.icon = 'school';
        break;
      case 'F': // FORESTAL
        this.icon = 'terrain';
        break;
      case 'G': // HOTEL, MOTEL
        this.icon = 'hotel';
        break;
      case 'I': // INDUSTRIA
      case 'M': // MINERIA
        this.icon = 'local_shipping';
        break;
      case 'H': // HABITACIONAL
        this.icon = 'business';
        break;
      case 'O': // OFICINA
        this.icon = 'work';
        break;
      case 'L': // BODEGA
        this.icon = 'meeting_room';
        break;
      case 'Q': // CULTO
        this.icon = '';
        break;
      case 'S': // SALUD
        this.icon = 'local_hospital';
        break;
      case 'Z': // ESTACIONAMIENTO
        this.icon = 'directions_car';
        break;
      default:
        this.icon = 'layers';
        break;
    }
  }

  ngOnInit() {
    this.selectedYear = this.rol.getYears()[0];
    this.showSuggestion = this.rol.hasExpiredQuotes();
    this.actualizarTipoTotal();
    this.iconInit();

  }

  liquidar(cuota?: Cuota): Promise<{}> {
    this.onWait();
    if ((this.rol.cuotas.size > 0) && ((cuota === undefined && this.rol.hasExpiredQuotes(1)) || (cuota === undefined || cuota.expired))) {
      return new Promise((resolve, reject) => this.contribucionesService.getRolUpdate(this.rol, this, true).then(() => {
          this.actualizarTipoTotal();
          this.offWait();
          resolve();
        })
      );
    } else {
      return new Promise((resolve, reject) => {
          this.actualizarTipoTotal();
          this.offWait();
          resolve();
        }
      );
    }
  }

  disableSuggestion(): void {
    this.disableSuggest.emit();
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

  seleccionar(tipo: TipoCuota): Promise<{}> {
    this.rol.seleccionar(tipo);
    for (const cuotaComponent of this.cuotaComponentList.toArray()) {
      cuotaComponent.reloadChecked();
    }
    return this.liquidar();
  }

  public onWait(): void {
    this.rol.wait = true;
    this.blockEvent.emit(this.rol.wait);
  }

  public offWait(): void {
    this.rol.wait = false;
    this.blockEvent.emit(this.rol.wait);
  }

}
