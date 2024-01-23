import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { jwtDecode } from 'jwt-decode';
import { MensagensService } from '../services/mensagens.service';

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
    public auth: AuthService,
    public router: Router,
    private messagensService: MensagensService
  ) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles: string[] = route.data['expectedRole'] || [];
  
    // Verifica se está no navegador antes de acessar o sessionStorage
    if (typeof sessionStorage !== 'undefined') {
      const token = sessionStorage.getItem('token') || null;
  
      if (token !== null) {
        const tokenPayload: MeuJwtPayload = jwtDecode(token);
      
        if (!this.auth.isAuthenticated() || (!expectedRoles.includes(tokenPayload.role) && tokenPayload.role !== 'ADMIN')) {
          this.messagensService.alert(
            'Esse usuário não tem autorização para acessar essa página!'
          );
          this.router.navigate(['/']);
          return false;
        }
  
        return true;
      } else {
        this.router.navigate(['login']);
        return false;
      }
    }
  
    return false; // Se não estiver no navegador, retorna falso
  }
  
}
