import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(public tokenService: TokenService, public router: Router) {}
  canActivate(): boolean {
    const token = this.tokenService.getToken();

    if (!this.tokenService.validadeToken(token)) {
      this.tokenService.removeToken();
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
