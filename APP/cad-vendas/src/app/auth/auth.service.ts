import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public jwtHelper: JwtHelperService) {}

  // Método para verificar se o usuário está autenticado
  public isAuthenticated(): boolean {
    // Obtém o token do armazenamento local
    const token = sessionStorage.getItem('token');

    // Verifica se o token expirou e retorna verdadeiro ou falso
    return !this.jwtHelper.isTokenExpired(token!);
  }
}
