import {Component, OnInit} from '@angular/core';
import {ContribucionesSugeridasService} from '../../../../services/contribuciones-sugeridas.service';
import {MdlSnackbarService} from '@angular-mdl/core';
import {Router} from '@angular/router';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html',
  styleUrls: ['./propiedades.component.scss']
})
export class PropiedadesComponent implements OnInit {

  constructor(private user: UserService,
              private contribucionesSugeridasService: ContribucionesSugeridasService,
              private mdlSnackbarService: MdlSnackbarService,
              private router: Router) {
  }

  hidden = false;
  isSugeridos = false;

  ngOnInit() {
    this.cargarRolesNoAsociados().then((data) => {
      if (data) {
        this.isSugeridos = true;
      } else {
        this.isSugeridos = false;
        this.router.navigate(['/main/contribuciones/agregar/nueva']);
      }
      console.log('this.isSugeridos', this.isSugeridos);
    }, () => {
      this.mdlSnackbarService.showSnackbar({
        message: 'Ocurrió un error buscar los roles asociados',
        timeout: 1500,
        action: {
          handler: () => {
          },
          text: 'ok'
        }
      });
    });

    console.log('this.isSugeridos', this.isSugeridos);
  }

  private cargarRolesNoAsociados(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.user.getRolesNoAsociados().then((rolesNoAsociados) => {
          this.hidden = true;
          if (rolesNoAsociados.length > 0) {
            resolve(true);
          } else {
            resolve(false);
          }

        },
        () => {
          reject();
        });
    });

  }
}
