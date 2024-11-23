import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenService } from "../services/token.service";
import { Observable } from "rxjs";

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const token = this.tokenService.getToken();
    
    if (token != null) {
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });

      // Verifica se a requisição é um FormData
      if (req.body instanceof FormData) {
        headers = headers
          .set('accept', 'application/json')
          .set('Content-Type', 'false')
          .set('processData', 'false');
      } else {
        headers = headers
          .set('accept', 'application/json')
          .set('Content-Type', 'application/json');
      }

      const request = req.clone({ headers });

      return next.handle(request);
    } else {
      // Se não houver token, apenas envie a solicitação original
      return next.handle(req);
    }
  }
}
