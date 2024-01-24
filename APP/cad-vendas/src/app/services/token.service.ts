import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  static getToken(): string | null {
    let token = null;
    if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem('token');
    }
    if (token == null && typeof sessionStorage !== 'undefined') {
      token = sessionStorage.getItem('token');
    }
    return token;
  }

  static setToken(token: string, lembrar: boolean) {
    if (lembrar) localStorage.setItem('token', token);
    else sessionStorage.setItem('token', token);
  }

  static removeToken() {
    if (typeof localStorage !== 'undefined') localStorage.removeItem('token');
    if (typeof sessionStorage !== 'undefined')
      sessionStorage.removeItem('token');
  }
}
