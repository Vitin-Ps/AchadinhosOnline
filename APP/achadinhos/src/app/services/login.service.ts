import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Login, Token } from '../interfaces/Login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private BaseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.BaseApiUrl}login`;

  constructor(private http: HttpClient) {}

  loginUser(login: Login): Observable<Token> {
    return this.http.post<Token>(this.apiUrl, login);
  }

  recuperarSenha(novaSenha: string, confirmaSenha: string, rawToken: string): Observable<Token> {
    return this.http.post<Token>(`${this.apiUrl}/recuperar`, {
      novaSenha,
      confirmaSenha,
      rawToken,
    });
  }
}
