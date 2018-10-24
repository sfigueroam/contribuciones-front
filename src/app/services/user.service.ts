import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  rut: string;
  constructor() {
    this.rut = '96597810';
  }

}
