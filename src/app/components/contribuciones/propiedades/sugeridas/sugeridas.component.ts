import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Propiedad} from '../../../../domain/Propiedad';
import {ContribucionesSugeridasService} from '../../../../services/contribuciones-sugeridas.service';
import {ListadoPropiedadComponent} from '../../listado/listado-propiedad/listado-propiedad.component';
import {SugeridasPropiedadComponent} from './sugeridas-propiedad/sugeridas-propiedad.component';



@Component({
  selector: 'app-sugeridas',
  templateUrl: './sugeridas.component.html',
  styleUrls: ['./sugeridas.component.scss']
})
export class SugeridasComponent implements OnInit {


  @ViewChildren(SugeridasPropiedadComponent)
  sugeridasPropiedadComponentList: QueryList<SugeridasPropiedadComponent>;

  propiedades: Propiedad[];
  hidden: boolean = false;
  cantidadSeleccionadas: number;


  constructor(private contribucionesSugeridasService: ContribucionesSugeridasService) {
    this.propiedades = [];
    this.cantidadSeleccionadas = 0;
  }
  ngOnInit() {
    this.cargarRolesNoAsociados();
  }

  private cargarRolesNoAsociados() {
    this.contribucionesSugeridasService.getRolesNoAsociados().then((rolesNoAsociados) => {
      this.propiedades = rolesNoAsociados;
      this.hidden = true;
    });
  }


  updateSeleccionadaTotal(): void {
    this.totalSeleccionadas();

  }

  totalSeleccionadas(): void {
    this.cantidadSeleccionadas = 0;
    const sugeridasPropiedades = this.sugeridasPropiedadComponentList.toArray();
    for(const sugeridas of sugeridasPropiedades){
      this.cantidadSeleccionadas = this.cantidadSeleccionadas + sugeridas.getCantidadRolesSeleccionadas();
    }
  }

  agregarPropiedad() {
    let roles: number [] = [];
    const sugeridasPropiedadesList = this.sugeridasPropiedadComponentList.toArray();

    for(const sugeridas of sugeridasPropiedadesList){
      roles = roles.concat(sugeridas.getRolesSeleccionadas());
    }

    console.log('Agregado propiedades');

    this.contribucionesSugeridasService.asociarRoles(roles).then(() => {
      console.log('Fin asociados');
    });

  }
}
