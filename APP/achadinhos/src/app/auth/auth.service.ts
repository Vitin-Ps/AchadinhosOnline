import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public jwtHelper: JwtHelperService) {}

  // Método para verificar se o usuário está autenticado
  public isAuthenticated(): boolean {
    // Obtém o token do armazenamento local
    const token = TokenService.getToken();

    // Verifica se o token expirou e retorna verdadeiro ou falso
    return !this.jwtHelper.isTokenExpired(token!);
  }
}
