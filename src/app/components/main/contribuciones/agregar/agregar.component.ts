import {Component, OnInit} from '@angular/core';
import {ContribucionesSugeridasService} from '../../../../services/contribuciones-sugeridas.service';
import {MdlSnackbarService} from '@angular-mdl/core';
import {Router} from '@angular/router';
import {UserService} from '../../../../services/user.service';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {

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
    }, () => {
      this.mdlSnackbarService.showSnackbar({
        message: 'Ocurrió un error buscar los roles asociados',
        timeout: environment.snackbarTime,
        action: {
          handler: () => {
          },
          text: 'ok'
        }
      });
    });
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
