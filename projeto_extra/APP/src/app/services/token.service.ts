import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export interface MeuJwtPayload {
  sub: string;
  role: string;
  id: number;
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  getToken(): string | null {
    let token = null;
    if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem('token');
    }
    if (token == null && typeof sessionStorage !== 'undefined') {
      token = sessionStorage.getItem('token');
    }
    return token;
  }

  setToken(token: string, lembrar: boolean) {
    if (lembrar) localStorage.setItem('token', token);
    else sessionStorage.setItem('token', token);
  }

  removeToken() {
    if (typeof localStorage !== 'undefined') localStorage.removeItem('token');
    if (typeof sessionStorage !== 'undefined') sessionStorage.removeItem('token');
  }

  validadeToken(token: string | null): boolean {
    if (!token) {
      return false;
    }

    const decodedToken = this.infoToken(token);

    if (!decodedToken || !decodedToken.exp) {
      return false;
    }

    const expiraEmSegundos = decodedToken.exp;

    const dataAtualEmSegundos = Math.floor(Date.now() / 1000);

    return expiraEmSegundos > dataAtualEmSegundos;
  }

  infoToken(token: string): MeuJwtPayload | null {
    try {
      const infoToken: MeuJwtPayload = jwtDecode(token);
      return infoToken;
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  }
}
