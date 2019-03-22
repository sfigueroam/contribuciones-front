import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {Propiedad} from '../../../../domain/Propiedad';
import {PropiedadRolComponent} from '../propiedad-rol/propiedad-rol.component';
import {Rol} from '../../../../domain/Rol';
import {CheckboxIcon} from '../../../../domain/CheckboxIcon';

@Component({
  selector: 'app-propiedad',
  templateUrl: './propiedad.component.html',
  styleUrls: ['./propiedad.component.scss']
})
export class PropiedadComponent implements OnInit {

  @Input()
  propiedad: Propiedad;

  @Input('default-seleccion')
  defaulSeleccion: boolean;

  @Output()
  change: EventEmitter<any> = new EventEmitter();

  @ViewChildren(PropiedadRolComponent)
  propiedadRolComponentList: QueryList<PropiedadRolComponent>;

  cantidadRolesSeleccionadas: number;
  public seleccion: boolean;
  selectedIcon: string;

  constructor() {


  }

  ngOnInit() {

    console.log('propiedades, ngOnInit');
    this.seleccion = true;
    if (this.defaulSeleccion === false) {
      this.seleccion = false;
    }
    this.updateIconSeleccion();
  }

  updatePropiedades(): void {
    this.evalSelectRoles();
    this.change.emit();

  }

  selectAllRol(): void {
    this.seleccion = !this.seleccion;
    this.updateIconSeleccion();
    this.updateRoles();
    this.change.emit();
  }

  updateRoles(): void {
    const sugeridosRolList = this.propiedadRolComponentList.toArray();
    for (const sugeridosRol of sugeridosRolList) {
      sugeridosRol.updateSeleccion(this.seleccion);
    }
    this.getCantidadRolesSeleccionadas();
  }

  getCantidadRolesSeleccionadas(): number {
    this.cantidadRolesSeleccionadas = 0;
    const sugeridosRolList = this.propiedadRolComponentList.toArray();
    for (const sugeridosRol of sugeridosRolList) {
      if (sugeridosRol.seleccion) {
        this.cantidadRolesSeleccionadas++;
      }
    }
    return this.cantidadRolesSeleccionadas;
  }

  getRolesSeleccionadas(): number [] {
    const roles: number[] = [];
    const sugeridosRolList = this.propiedadRolComponentList.toArray();
    for (const sugeridosRol of sugeridosRolList) {
      if (sugeridosRol.seleccion) {
        roles.push(sugeridosRol.rol.rol);
      }
    }
    return roles;
  }

  private updateIconSeleccion(): void {

    if (this.seleccion === undefined) {
      this.selectedIcon = CheckboxIcon.INDETERMINATE;
    } else if (this.seleccion) {
      this.selectedIcon = CheckboxIcon.SELECTED;
    } else {
      this.selectedIcon = CheckboxIcon.UNSELECTED;
    }
  }

  private evalSelectRoles() {

    let cantidad = 0;
    const sugeridosRolList = this.propiedadRolComponentList.toArray();
    for (const sugeridosRol of sugeridosRolList) {
      if (sugeridosRol.seleccion) {
        cantidad++;
      }
    }
    if (cantidad === sugeridosRolList.length) {
      this.seleccion = true;
    } else if (cantidad === 0) {
      this.seleccion = false;
    } else {
      this.seleccion = undefined;
    }
    this.updateIconSeleccion();
  }

  getRolesSeleccioados(): Rol[] | undefined {

    const roles: Rol[] = [];
    const rolesList = this.propiedadRolComponentList.toArray();
    for (const rol of rolesList) {
      if (rol.seleccion) {
        roles.push(rol.rol);
      }
    }
    if (roles.length === 0) {
      return undefined;
    }
    return roles;

  }

  getCantRoles(): number {
    const rolesList = this.propiedadRolComponentList.toArray();
    return rolesList.length;

  }

  updateSeleccion(selec: boolean){
    this.seleccion = selec;
    this.updateIconSeleccion();
    this.updateRoles();
  }
}
