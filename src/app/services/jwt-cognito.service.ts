import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtCognitoService {
  jwt: string;

  constructor() { }
}
