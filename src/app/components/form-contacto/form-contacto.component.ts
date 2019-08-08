import { Component, OnInit } from '@angular/core';

export interface TipoSolicitud {
value: string;
viewValue: string;
}


@Component({
  selector: 'app-form-contacto',
  templateUrl: './form-contacto.component.html',
  styleUrls: ['./form-contacto.component.scss']
})
export class FormContactoComponent implements OnInit {
  
  
  tipoSolicitudes: TipoSolicitud[] = [
    {value: 'C', viewValue: 'Consulta'},
    {value: 'S', viewValue: 'Sugerencia'},
    {value: 'R', viewValue: 'Reclamo'},
    {value: 'F', viewValue: 'Felicitación'}, 
    {value: 'RE', viewValue: 'Reportar Error'}, 
    {value: 'SF', viewValue: 'Solicitar Nueva Funcionalidad'}
    ];
  
  constructor() { }

  ngOnInit() {
    
  }

}







