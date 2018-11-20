import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-confirmar-desasociar',
  templateUrl: './confirmar-desasociar.component.html',
  styleUrls: ['./confirmar-desasociar.component.scss']
})
export class ConfirmarDesasociarComponent implements OnInit {

  @ViewChild('dialog')
  dialog: ElementRef;

  @Output()
  confirmar: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }


  closeDialog() {
    this.dialog.nativeElement.close();
  }

  showDialog(): void {

    this.dialog.nativeElement.showModal();
  }

  aceptar() {
    this.confirmar.emit();
    this.dialog.nativeElement.close();
  }
}
