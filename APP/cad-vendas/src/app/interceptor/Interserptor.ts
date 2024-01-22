import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let headers: HttpHeaders | undefined = undefined; // Inicializa como undefined para limpá-lo se necessário
    const token = sessionStorage.getItem('token');
    
    if (token != null) {
      if (req.body instanceof FormData) {
        debugger;
        headers = new HttpHeaders({
          contentType: 'false',
          processData: 'false',
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        });
      } else {
        headers = new HttpHeaders()
          .append('accept', 'application/json')
          .append('Content-Type', 'application/json')
          .append('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
      }
    }

    let request = req.clone({ headers });

    return next.handle(request).pipe(
      map((event) => {
        return event;
      })
    );
  }
}
