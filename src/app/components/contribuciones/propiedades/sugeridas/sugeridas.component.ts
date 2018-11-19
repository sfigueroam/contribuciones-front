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
    const sugeridasPropiedades = this.sugeridasPropiedadComponentList.toArray();

    this.totalSeleccionadas();

  }

  totalSeleccionadas(): void {
    this.cantidadSeleccionadas = 0;
    const sugeridasPropiedades = this.sugeridasPropiedadComponentList.toArray();
    for(const sugeridas of sugeridasPropiedades){
      this.cantidadSeleccionadas = this.cantidadSeleccionadas + sugeridas.getRolesSeleccionadas();
    }
  }
}
