import { DFFormulario } from './DFFormulario';
import { Observable, Subject } from 'rxjs';
import { TipoCuota } from './TipoCuota';



export class DFServicio {

    servicioId: number;     // Identificador del servicio
    servicioNom: string;    // Nombre del servicio

    listFormulario: DFFormulario[]; // Listado de formularios

    isComplete = false;
    changeSubject: Subject<any> = new Subject<any>();
    changeStream: Observable<any> = this.changeSubject.asObservable();

    total: number;      // Monto total por servicio
    parcial: number;    // Monto parcial por servicio
    condonacion: number;    // Monto condonacion por servicio

    expired = false;

    public constructor( servicioId: number, servicioNom: string, listFormulario: DFFormulario[] ) {

        this.servicioId = servicioId;
        this.servicioNom = servicioNom;
        this.listFormulario = listFormulario;

        this.total = 0;
        this.parcial = 0;
        this.condonacion = 0;

    }

    // seleccionar( tipo: TipoCuota ) {

    //     for (const formulario of this.listFormulario) {
    //       formulario.seleccionar( tipo );
    //     }

    // }

}
