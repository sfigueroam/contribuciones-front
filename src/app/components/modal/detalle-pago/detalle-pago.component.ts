import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-detalle-pago',
  templateUrl: './detalle-pago.component.html',
  styleUrls: ['./detalle-pago.component.scss']
})
export class DetallePagoComponent implements OnInit {


  @ViewChild('dialog')
  dialog: ElementRef;


  constructor() { }

  ngOnInit() {
  }

  closeDialog(){
    this.dialog.nativeElement.close();
  }
  showDialog(){
    this.dialog.nativeElement.showModal();
  }

  siguiente() {

  }
}
