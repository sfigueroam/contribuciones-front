import { Component, OnInit } from '@angular/core';
import {ContributionsService} from '../../../../services/contributions.service';
import {Rol} from '../../../../domain/Rol';



@Component({
  selector: 'app-sugeridas',
  templateUrl: './sugeridas.component.html',
  styleUrls: ['./sugeridas.component.scss']
})
export class SugeridasComponent implements OnInit {


  roles: Rol[];

  constructor(private contributionsService: ContributionsService) {
    this.roles = [];
  }
  ngOnInit() {
    this.cargarRolesNoAsociados();
  }

  private cargarRolesNoAsociados() {
    this.contributionsService.getRolesNoAsociados().then((rolesNoAsociados) => {
      this.roles = rolesNoAsociados;
    });
  }
}
