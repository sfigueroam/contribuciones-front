import {Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Propiedad} from '../../../../../domain/Propiedad';
import {SugeridasPropiedadRolComponent} from '../sugeridas-propiedad-rol/sugeridas-propiedad-rol.component';

declare var componentHandler: any;

@Component({
  selector: 'app-sugeridas-propiedad',
  templateUrl: './sugeridas-propiedad.component.html',
  styleUrls: ['./sugeridas-propiedad.component.scss']
})
export class SugeridasPropiedadComponent implements OnInit {

  @Input()
  propiedad: Propiedad;

  @ViewChildren(SugeridasPropiedadRolComponent)
  sugeridasPropiedadRolComponentList: QueryList<SugeridasPropiedadRolComponent>;


  cantidadRolesSeleccon: number;
  seleccion: boolean;

  constructor() {
    this.seleccion = true;
  }

  ngOnInit() {
  }

  change(): void {
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
      sugeridosRol.seleccion = this.seleccion;
    }
    this.updateCantidadRolesSeleccionados();
  }

  updateCantidadRolesSeleccionados(): Number {
    this.cantidadRolesSeleccon = 0;
    const sugeridosRolList = this.sugeridasPropiedadRolComponentList.toArray();
    for (const sugeridosRol of sugeridosRolList) {
      if (sugeridosRol.seleccion) {
        this.cantidadRolesSeleccon++;
      }
    }

    return this.cantidadRolesSeleccon;


  }
}
