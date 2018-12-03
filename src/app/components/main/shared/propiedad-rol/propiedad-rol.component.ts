import {AfterContentInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Rol} from '../../../../domain/Rol';

@Component({
  selector: '[app-propiedad-rol]',
  templateUrl: './propiedad-rol.component.html',
  styleUrls: ['./propiedad-rol.component.scss']
})
export class PropiedadRolComponent implements OnInit, AfterContentInit {


  @Input()
  rol: Rol;

  seleccion: boolean;


  icon: string;
  selectedIcon: string;

  constructor() {
    this.icon = '';
    this.seleccion = true;
    this.selectedIcon = 'checked';
  }

  @Output()
  change: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.iconInit();
  }

  ngAfterContentInit() {
    setTimeout(
      () => {
        this.change.emit();
      },
      100
    );
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

  updateSeleccion(checked: boolean): void {
    this.seleccion = checked;
    this.updateIconSeleccion();
  }


  private updateIconSeleccion(): void {
    if (this.seleccion) {
      this.selectedIcon = 'checked';
    } else {
      this.selectedIcon = 'unchecked';
    }
  }
  selectRol(): void {
    this.seleccion = !this.seleccion;
    this.updateIconSeleccion();
    this.change.emit();
  }

}
