import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DFServicio } from '../../../domain/DFServicio';
import { CheckboxIcon } from '../../../domain/CheckboxIcon';
import { MdlDialogService } from '@angular-mdl/core';
import { UserService } from '../../../services/user.service';




@Component({
  selector: 'app-deuda-fiscal-servicio',
  templateUrl: './deuda-fiscal-servicio.component.html',
  styleUrls: ['./deuda-fiscal-servicio.component.scss']
})

export class DeudaFiscalServicioComponent implements OnInit {


  @Input() servicio: DFServicio;

  @Output() change: EventEmitter<any> = new EventEmitter();

  expanded: boolean;

  constructor( private user: UserService,
               private dialogService: MdlDialogService, ) { }


  ngOnInit() {
  }


  toggle() {
    this.expanded = !this.expanded;
  }


  onChange() {
    this.change.emit();
  }

}
