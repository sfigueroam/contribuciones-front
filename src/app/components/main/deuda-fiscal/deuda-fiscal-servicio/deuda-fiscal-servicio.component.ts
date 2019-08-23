import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MdlDialogService } from '@angular-mdl/core';
import { DFServicio } from '../../../../domain/DFServicio';
import { UserService } from '../../../../services/user.service';



@Component({
  selector: 'app-deuda-fiscal-servicio',
  templateUrl: './deuda-fiscal-servicio.component.html',
  styleUrls: ['./deuda-fiscal-servicio.component.scss']
})

export class DeudaFiscalServicioComponent implements OnInit {



  mtoServ: number;      // Monto a pagar por servicio

  indMto: boolean;      // Indicador de monto total/parcial a mostrar ( true: muestra total/oculta parcial; false: oculta total/muestra parcial )

  expanded: boolean;


  @Input() servicio: DFServicio;


  // @Output() change: EventEmitter<any> = new EventEmitter();


  constructor( private user: UserService,
               private dialogService: MdlDialogService ) {

    this.indMto = true;    
    this.expanded = true;        

  }


  ngOnInit() {

    //this.mtoServ = this.obtenerMonto( this.indMto );

  }


  toggle() {
    this.expanded = !this.expanded;
  }


  onChange() {
    console.log("change del servicio");
    // this.change.emit();
  }

  actualizarMonto( indMontoTotal: boolean ) {

    let monto: number = 0;

    for (let form of this.servicio.listFormulario) {
      for (let det of form.listDetalle) {
        if (det.intencionPago) {
          if (indMontoTotal) {
            monto = monto + det.montoTotal;
          } else {
            monto = monto + det.montoParcial;
          }
        } 

      }
    }

    this.mtoServ = monto;

  }


  // Método que calcula el monto a pagar por servicio.
  obtenerMonto( indMto: boolean ): number{

    let mto: number = 0;

    for ( let formulario of this.servicio.listFormulario ) { 

      for ( let det of formulario.listDetalle ) {

        if ( indMto ){
          mto = mto + det.montoTotal;
        } else {
          mto = mto + det.montoParcial;
        }

      }            

    }

    return mto;
  }

}
