import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {Propiedad} from '../../../../../domain/Propiedad';
import {SugeridasPropiedadRolComponent} from '../sugeridas-propiedad-rol/sugeridas-propiedad-rol.component';

declare var componentHandler: any;

@Component({
  selector: '[app-sugeridas-propiedad]',
  templateUrl: './sugeridas-propiedad.component.html',
  styleUrls: ['./sugeridas-propiedad.component.scss']
})
export class SugeridasPropiedadComponent implements OnInit {

  @Input()
  propiedad: Propiedad;

  @Output()
  change: EventEmitter<any> = new EventEmitter();

  @ViewChildren(SugeridasPropiedadRolComponent)
  sugeridasPropiedadRolComponentList: QueryList<SugeridasPropiedadRolComponent>;


  cantidadRolesSeleccionadas: number;
  seleccion: boolean;

  constructor() {
    this.seleccion = true;
  }

  ngOnInit() {
  }

  updatePropiedades(): void {
    this.change.emit();
    //componentHandler.upgradeAllRegistered();
  }

  selectAllRol(): void {
    this.seleccion = !this.seleccion;
    console.log('selectAllRol');
    this.updateRoles();
  }

  updateRoles(): void {
    const sugeridosRolList = this.sugeridasPropiedadRolComponentList.toArray();

    for (const sugeridosRol of sugeridosRolList) {
      sugeridosRol.updateSeleccion(this.seleccion);
    }
    this.getRolesSeleccionadas();
  }

  getRolesSeleccionadas(): number {
    this.cantidadRolesSeleccionadas = 0;
    const sugeridosRolList = this.sugeridasPropiedadRolComponentList.toArray();
    for (const sugeridosRol of sugeridosRolList) {
      if (sugeridosRol.seleccion) {
        this.cantidadRolesSeleccionadas++;
      }
    }
    return this.cantidadRolesSeleccionadas;
  }
}
