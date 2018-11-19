import { Component, OnInit } from '@angular/core';
import {Propiedad} from '../../../../domain/Propiedad';
import {ContribucionesSugeridasService} from '../../../../services/contribuciones-sugeridas.service';



@Component({
  selector: 'app-sugeridas',
  templateUrl: './sugeridas.component.html',
  styleUrls: ['./sugeridas.component.scss']
})
export class SugeridasComponent implements OnInit {


  propiedades: Propiedad[];

  hidden: boolean = false;


  constructor(private contribucionesSugeridasService: ContribucionesSugeridasService) {
    this.propiedades = [];
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
}
