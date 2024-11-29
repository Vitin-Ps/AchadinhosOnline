import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcionario } from '../interfaces/Funcionario';
import { environment } from '../../environments/environment';
import { Response } from '../interfaces/Response';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}funcionarios`;

  constructor(private http: HttpClient) {}

  registraFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.apiUrl, funcionario);
  }

  // listarFuncionariosPage(
  //   page: number,
  //   pageSize: number,
  //   sort: string
  // ): Observable<Response<Funcionario[]>> {
  //   const params = new HttpParams()
  //     .set('page', page.toString())
  //     .set('size', pageSize.toString())
  //     .set('sort', sort);
  //   return this.http.get<Response<Funcionario[]>>(this.apiUrl, { params });
  // }

  listarFuncionariosAll(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.apiUrl);
  }

  excluirFuncionarioLogico(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  excluirFuncionarioDefinitivo(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}/apagar`);
  }

  alteraFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.put<Funcionario>(this.apiUrl, funcionario);
  }

  detalharFuncionario(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.apiUrl}/${id}`);
  }
}
