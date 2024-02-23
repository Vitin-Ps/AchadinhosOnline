import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Produto } from '../interfaces/Produto';
import { Observable } from 'rxjs';
import { Response } from '../interfaces/Response';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}produtos`;
  constructor(private http: HttpClient) {}

  registrar(produto: Produto): Observable<Produto> {
    console.log(this.apiUrl);
    return this.http.post<Produto>(this.apiUrl, produto);
  }

  listarPage(
    page: number,
    size: number,
    sort: string
  ): Observable<Response<Produto[]>> {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString())
    .set('sort', sort)

    return this.http.get<Response<Produto[]>>(this.apiUrl, {params});
  }

  listarAll(): Observable<Response<Produto[]>> {
    return this.http.get<Response<Produto[]>>(this.apiUrl);
  }
}
