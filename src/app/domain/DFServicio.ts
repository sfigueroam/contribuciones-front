import { DFFormulario } from './DFFormulario';
import { DFDeuda } from './DFDeuda';


export class DFServicio {

    servicioId: number;
    servicioNom: string;

    listFormulario: DFFormulario[];

    public constructor( servicioId:number, servicioNom:string, listFormulario:DFFormulario[] ) {

        this.servicioId = servicioId;
        this.servicioNom = servicioNom;
        this.listFormulario = listFormulario;

    }    

}