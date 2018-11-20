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
  selectedIcon: string;

  constructor() {
    this.seleccion = true;
    this.updateIconSeleccion();
  }

  ngOnInit() {
  }

  updatePropiedades(): void {
    this.evalSelectRoles();
    this.change.emit();

  }

  selectAllRol(): void {
    this.seleccion = !this.seleccion;
    console.log('selectAllRol');
    this.updateIconSeleccion();
    this.updateRoles();
    this.change.emit();
  }

  updateRoles(): void {
    const sugeridosRolList = this.sugeridasPropiedadRolComponentList.toArray();
    for (const sugeridosRol of sugeridosRolList) {
      sugeridosRol.updateSeleccion(this.seleccion);
    }
    this.getCantidadRolesSeleccionadas();
  }

  getCantidadRolesSeleccionadas(): number {
    this.cantidadRolesSeleccionadas = 0;
    const sugeridosRolList = this.sugeridasPropiedadRolComponentList.toArray();
    for (const sugeridosRol of sugeridosRolList) {
      if (sugeridosRol.seleccion) {
        this.cantidadRolesSeleccionadas++;
      }
    }
    return this.cantidadRolesSeleccionadas;
  }

  getRolesSeleccionadas(): number [] {
    let roles: number[] = [];

    const sugeridosRolList = this.sugeridasPropiedadRolComponentList.toArray();
    for (const sugeridosRol of sugeridosRolList) {
      if (sugeridosRol.seleccion) {
        roles.push(sugeridosRol.rol.rol);
      }
    }
    return roles;
  }

  private updateIconSeleccion(): void {

    if(this.seleccion === undefined){
      this.selectedIcon = 'indeterminate_check_box';
    } else if (this.seleccion) {
      this.selectedIcon = 'checked';
    } else {
      this.selectedIcon = 'unchecked';
    }
  }

  private evalSelectRoles() {

    let cantidad = 0;
    const sugeridosRolList = this.sugeridasPropiedadRolComponentList.toArray();
    for (const sugeridosRol of sugeridosRolList) {
      if (sugeridosRol.seleccion) {
        cantidad++;
      }
    }
    if (cantidad === sugeridosRolList.length) {
      this.seleccion = true;
    } else if (cantidad === 0){
      this.seleccion = false;
    }else{
      this.seleccion = undefined;
    }
    this.updateIconSeleccion();
  }
}
