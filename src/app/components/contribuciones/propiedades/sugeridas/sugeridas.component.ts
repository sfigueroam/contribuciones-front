import { Component, OnInit } from '@angular/core';
import {ContributionsService} from '../../../../services/contributions.service';
import {Rol} from '../../../../domain/Rol';
import {Propiedad} from '../../../../domain/Propiedad';



@Component({
  selector: 'app-sugeridas',
  templateUrl: './sugeridas.component.html',
  styleUrls: ['./sugeridas.component.scss']
})
export class SugeridasComponent implements OnInit {


  propiedades: Propiedad[];

  constructor(private contributionsService: ContributionsService) {
    this.propiedades = [];
  }
  ngOnInit() {
    this.cargarRolesNoAsociados();
  }

  private cargarRolesNoAsociados() {
    this.contributionsService.getRolesNoAsociados().then((rolesNoAsociados) => {
      this.propiedades = rolesNoAsociados;
    });
  }
}
