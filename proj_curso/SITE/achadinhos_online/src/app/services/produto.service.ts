import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../interfaces/Produto';
import { Observable } from 'rxjs';

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
}
