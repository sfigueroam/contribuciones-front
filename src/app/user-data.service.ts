import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  nombre_usuario: string;
  
  
  constructor() { }
  
  primer_nombre = this.nombre_usuario.split(' ')[0];
  
  
}
