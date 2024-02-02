import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Response } from '../interfaces/Response';
import { Carrinho } from '../interfaces/Carrinho';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}carrinho`;

  constructor(private http: HttpClient) {}

  addItemCarrinho(carrinho: Carrinho[]): Observable<Carrinho[]> {
    return this.http.post<Carrinho[]>(this.apiUrl, carrinho);
  }

  listarItensPorFuncionarioId(id: number): Observable<Carrinho[]> {
    return this.http.get<Carrinho[]>(`${this.apiUrl}/${id}`);
  }

  limparCarrinho(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
