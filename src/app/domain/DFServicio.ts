import { DFFormulario } from './DFFormulario';
import { Observable, Subject } from 'rxjs';
import { TipoCuota } from './TipoCuota';



export class DFServicio {

    servicioId: number;
    servicioNom: string;

    listFormulario: DFFormulario[];

    isComplete = false;
    changeSubject: Subject<any> = new Subject<any>();
    changeStream: Observable<any> = this.changeSubject.asObservable();

    total: number;
    condonacion: number;

    expired = false;

    public constructor( servicioId: number, servicioNom: string, listFormulario: DFFormulario[] ) {

        this.servicioId = servicioId;
        this.servicioNom = servicioNom;
        this.listFormulario = listFormulario;

        this.total = 0;

    }

    seleccionar( tipo: TipoCuota ) {

        for (const formulario of this.listFormulario) {
          formulario.seleccionar( tipo );
        }

    }

}
