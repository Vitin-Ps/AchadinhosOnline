import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Produto } from '../interfaces/Produto';
import { Observable } from 'rxjs';
import { Response } from '../interfaces/Response';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}produtos`;
  constructor(private http: HttpClient) {}

  cadastraProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto);
  }

  // listarProdutosPage(
  //   page: number,
  //   pageSize: number,
  //   sort: string
  // ): Observable<Response<Produto[]>> {
  //   const params = new HttpParams()
  //     .set('page', page.toString())
  //     .set('size', pageSize.toString())
  //     .set('sort', sort);

  //   return this.http.get<Response<Produto[]>>(this.apiUrl, { params });
  // }

  listarProdutosAll(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  listarProdutosCarrinhoAll(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}/carrinho`);
  }

  excluirProdutoLogico(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  excluirProdutoDefinitivo(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}/apagar`);
  }

  detalharProduto(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }

  detalharProdutoCarrinho(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/carrinho/${id}`);
  }

  alteraProduto(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(this.apiUrl, produto);
  }
}
