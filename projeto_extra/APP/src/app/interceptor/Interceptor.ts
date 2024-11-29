import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();

    if (token != null) {
      if (!this.tokenService.validadeToken(token)) {
        this.tokenService.removeToken();
        this.router.navigate(['/login']);
      }
      let headers = new HttpHeaders({
        Authorization: 'Bearer ' + token,
      });

      // Verifica se a requisição é um FormData
      if (req.body instanceof FormData) {
        headers = headers
          .set('accept', 'application/json')
          .set('Content-Type', 'false')
          .set('processData', 'false');
      } else {
        headers = headers.set('accept', 'application/json').set('Content-Type', 'application/json');
      }

      const request = req.clone({ headers });

      return next.handle(request);
    } else {
      return next.handle(req);
    }
  }
}
