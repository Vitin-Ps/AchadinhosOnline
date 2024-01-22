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

  addItemNoCarrinho(items: CarrinhoEnvio[]): Observable<CarrinhoEnvio[]> {
    console.log(items)
      return this.http.post<CarrinhoEnvio[]>(this.apiUrl, items);
  }

  listarItemsAllPorIdFuncionario(idFuncionario: number): Observable<Response<Carrinho[]>> {
    console.log(`${this.apiUrl}/${idFuncionario}`)
    return this.http.get<Response<Carrinho[]>>(`${this.apiUrl}/${idFuncionario}`);
  }

  limparCarrinho(id: number) {
    const url = `${this.apiUrl}/${id}`
    return this.http.delete(url);
  }
}
