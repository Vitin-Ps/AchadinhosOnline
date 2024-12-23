import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carrinho, CarrinhoEnvio } from '../interfaces/Carrinho';
import { Response } from '../interfaces/Response';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}carrinho`;

  constructor(private http: HttpClient) {}

  addItemsNoCarrinho(items: CarrinhoEnvio[]): Observable<Carrinho[]> {
    return this.http.post<Carrinho[]>(this.apiUrl, items);
  }

  removeItemsNoCarrinho(items: CarrinhoEnvio[]): Observable<Carrinho[]> {
    return this.http.post<Carrinho[]>(`${this.apiUrl}/remover`, items);
  }

  listarItemsAllPorIdFuncionario(
    idFuncionario: number,
    codEditVenda: boolean
  ): Observable<Carrinho[]> {
    return this.http.get<Carrinho[]>(`${this.apiUrl}/${idFuncionario}/${codEditVenda}`);
  }

  limparCarrinho(id: number, codEditVenda: boolean) {
    const url = `${this.apiUrl}/${id}/${codEditVenda}`;
    return this.http.delete(url);
  }
}
