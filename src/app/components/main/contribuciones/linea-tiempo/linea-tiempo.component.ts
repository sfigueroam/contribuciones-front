import {Component, Input, OnInit} from '@angular/core';
import {Rol} from '../../../../domain/Rol';
// Probando logeo
import {UserService} from '../../../../services/user.service';
import {CognitoService} from '../../../../services/cognito.service';

@Component({
  selector: 'app-linea-tiempo',
  templateUrl: './linea-tiempo.component.html',
  styleUrls: ['./linea-tiempo.component.scss']
})
export class LineaTiempoComponent implements OnInit {

  // Probando logeo
  logged: boolean;
  
  @Input()
  buscar: boolean;
  @Input()
  seleccionar: boolean;

  @Input()
  doneBuscar: boolean;
  @Input()
  doneSeleccionar: boolean;


  constructor(
    // Probando logeo
    private user: UserService ) { }

  ngOnInit() {
    // Probando logeo
    this.logged = this.user.isLogged();
  }

}
