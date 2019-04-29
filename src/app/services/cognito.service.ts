import {Inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from './user.service';
import {delay} from 'q';
import {JwtCognitoService} from './jwt-cognito.service';
import {Auth} from 'aws-amplify';
import {DOCUMENT} from '@angular/common';
import {CognitoUser} from 'amazon-cognito-identity-js';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  helper: JwtHelperService;
  identity: any;
  jwt: string;
  exp: Date;

  private cognitoUser: CognitoUser & { challengeParam: { email: string } };

  private window: Window;

  constructor(private cookie: CookieService,
              private user: UserService,
              private jwtCognito: JwtCognitoService,
              @Inject(DOCUMENT) private document: Document) {
    this.window = this.document.defaultView;
    this.helper = new JwtHelperService();
    if (this.cookie.check(environment.cognito.jwtCookieName)) {
      this.init(this.cookie.get(environment.cognito.jwtCookieName));
      this.authenticate();
    }


  }

  loginUrl(): string {
    return environment.cognito.authorizeURL
      + '?response_type=token&client_id='
      + environment.cognito.clientId
      + '&redirect_uri='
      + environment.cognito.redirectUri;
  }

  logoutUrl(): string {
    return environment.cognito.logoutURL
      + '?client_id='
      + environment.cognito.clientId
      + '&logout_uri='
      + environment.cognito.logoutUri;
  }

  private username(): string {
    if (this.identity.hasOwnProperty('custom:clave-unica:run')) {
      const temp = JSON.parse(this.identity['custom:clave-unica:run']);
      if (temp.tipo === 'RUN') {
        return temp.numero;
      }
    }

    if (this.identity.hasOwnProperty('cognito:username')) {
      return this.identity['cognito:username'].split('-')[0];
    }

    return null;
  }

  createCookie(): void {
    if (environment.cognito.allowCookies) {
      this.cookie.set(environment.cognito.jwtCookieName, this.jwt);
    }
  }

  createExpirationCookie(): void {
    const now = new Date();
    const exp = now.getTime() + (this.identity['exp'] - this.identity['iat']) * 1000;
    this.exp = new Date(exp);
    console.log('Fecha en la que expirará el JWT', this.exp);
    if (environment.cognito.allowCookies) {
      this.cookie.set(environment.cognito.expCookieName, String(exp));
    }
  }

  removeCookies(): void {
    if (environment.cognito.allowCookies) {
      this.cookie.delete(environment.cognito.jwtCookieName);
      this.cookie.delete(environment.cognito.expCookieName);
    }
  }

  authenticate(): void {
    this.user.setRut(this.username());

    this.expiredSessionMonitor();
  }

  private init(jwt: string) {
    this.jwt = jwt;
    this.identity = this.helper.decodeToken(this.jwt);
    this.jwtCognito.jwt = this.jwt;
  }

  login(fragment: string): Promise<any> {
    return new Promise<any>(
      resolve => {
        const values = {};
        fragment.split('&').forEach((value) => {
          const strings = value.split('=');
          values[strings[0]] = strings[1];
        });

        this.init(values['id_token']);
        this.createCookie();
        this.createExpirationCookie();

        this.authenticate();
        resolve(this.identity);
      }
    );
  }

  getExpirationDate(): Date {
    if (environment.cognito.allowCookies && this.cookie.check(environment.cognito.expCookieName)) {
      return new Date(+this.cookie.get(environment.cognito.expCookieName));
    } else {
      return this.exp;
    }
  }

  redirectLogin(): void {
    window.location.href = this.loginUrl();
  }

  logout(): void {
    this.removeCookies();
    window.location.href = this.logoutUrl();
  }

  expiredSessionMonitor(): Promise<any> {
    return new Promise<any>(
      async (resolve) => {
        while (true) {
          const exp = this.getExpirationDate();
          const now = new Date();
          if (exp <= now) {
            console.log('Sesion expired... login out');
            this.logout();
            break;
          }
          const sleepTime = exp.getTime() - now.getTime();

          console.log('Checking sesion in ' + sleepTime / 1000 + ' seconds');
          await delay(Math.max(sleepTime, 30000));
        }
        resolve();
      }
    );
  }

  /**
   *
   * Metodos para validacion por Email
   *
   */

  public async signInEmail(email: string) {
    this.cognitoUser = await Auth.signIn(email).then().catch(err => {
      if (err.code === 'UserNotFoundException') {
        return this.signUpEmail(email);
      }
      throw err;
    });
  }

  public async signOutEmail() {
    await Auth.signOut();
  }

  public async signUpEmail(email: string) {
    const params = {
      username: email,
      password: this.getRandomString(30),
      attributes: {
        name: email
      }
    };
    await Auth.signUp(params);
  }

  public async answerCustomChallenge(answer: string) {
    this.cognitoUser = await Auth.sendCustomChallengeAnswer(this.cognitoUser, answer);
    return this.isAuthenticatedMail();
  }

  public async isAuthenticatedMail() {
    try {
      await Auth.currentSession();
      return true;
    } catch {
      return false;
    }
  }

  private getRandomString(bytes: number) {
    const randomValues = new Uint8Array(bytes);
    this.window.crypto.getRandomValues(randomValues);
    return Array.from(randomValues).map(this.intToHex).join('');
  }

  private intToHex(nr: number) {
    return nr.toString(16).padStart(2, '0');
  }

  public async getUserDetails() {
    const email = await Auth.currentUserInfo();
    this.user.email = email.username;
    return this.user.email;
  }

  public async getToken() {
    let tokenReturn;
    await Auth.currentSession().then(token => {
      tokenReturn = token;
    });

    return tokenReturn.accessToken.jwtToken;
  }
}
