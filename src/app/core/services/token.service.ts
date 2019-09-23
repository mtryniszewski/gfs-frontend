import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  decodedToken: any;

  constructor(
    private jwtHelperService: JwtHelperService
  ) { }

  getDecodedToken() {
    if (this.decodedToken === undefined || this.decodedToken === null) {
      this.decodeToken();
    }
    return this.decodedToken;
  }

  isToken(): boolean {
    return this.jwtHelperService.tokenGetter() && !this.jwtHelperService.isTokenExpired();
  }

  setToken(token: string) {
    localStorage.setItem(environment.token, token);
  }

  removeToken() {
    localStorage.removeItem(environment.token);
    this.decodedToken = null;
  }

  getToken(): string {
    return localStorage.getItem(environment.token);
  }

  private decodeToken() {
    this.decodedToken = this.jwtHelperService.decodeToken(this.getToken());
  }
}
