import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Rol} from '../../../../../domain/Rol';
import {TipoCuota} from '../../../../../domain/TipoCuota';

@Component({
  selector: '[app-sugeridas-propiedad-rol]',
  templateUrl: './sugeridas-propiedad-rol.component.html',
  styleUrls: ['./sugeridas-propiedad-rol.component.scss']
})
export class SugeridasPropiedadRolComponent implements OnInit, AfterViewInit  {



  @Input()
  rol: Rol;

  seleccion: boolean;



  icon: string;

  constructor() {
    this.icon = '';
    this.seleccion = true;
  }

  @Output()
  change: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.iconInit();
  }
  ngAfterViewInit() {
  //  this.change.emit();
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

  selectRol(): void {
    this.seleccion = !this.seleccion;
    console.log('selectAllNone');
  }

}
