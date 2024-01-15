import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import decode, { jwtDecode } from 'jwt-decode';
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
    const expectedRole = route.data['expectedRole'];
    let token = null;
    if (sessionStorage !== undefined)
      token = sessionStorage.getItem('token')
        ? sessionStorage.getItem('token')
        : null;
    if (token != null) {
      const tokenPayload: MeuJwtPayload = jwtDecode(token);
      if (!this.auth.isAuthenticated() || tokenPayload.role != expectedRole) {
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
}
