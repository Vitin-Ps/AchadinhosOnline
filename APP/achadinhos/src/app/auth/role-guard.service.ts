import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { MensagensService } from '../services/mensagens.service';
import { TokenService } from '../services/token.service';

interface MeuJwtPayload {
  sub: string;
  role: string;
  id: number;
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(
    public router: Router,
    private messagensService: MensagensService,
    private tokenService: TokenService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles: string[] = route.data['expectedRole'] || [];

    // Verifica se está no navegador antes de acessar o sessionStorage
    const token = this.tokenService.getToken();

    if (token) {
      const tokenPayload: MeuJwtPayload | null = this.tokenService.infoToken(token);

      if (!this.tokenService.validadeToken(token)) {
        this.tokenService.removeToken();
        this.router.navigate(['login']);
      } else if (
        tokenPayload &&
        !expectedRoles.includes(tokenPayload.role) &&
        tokenPayload.role !== 'ADMIN'
      ) {
        this.messagensService.alert('Esse usuário não tem autorização para acessar essa página!');
        this.router.navigate(['/']);
        return false;
      }

      return true;
    } else {   
      return false;
    }
  }
}
