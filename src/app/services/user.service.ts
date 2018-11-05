import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  rut: string;
  constructor() {
    this.rut = '96597810';
    //this.rut = '12238422';
    //this.rut = '17663951';
    //this.rut = '1070713';
  }

}
