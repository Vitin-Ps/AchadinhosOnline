import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Funcionario } from '../interfaces/Funcionario';
import { Observable } from 'rxjs';
import { Response } from '../interfaces/Response';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}funcionarios`;
  constructor(private http: HttpClient) {}

  registrar(funcionario: Funcionario): Observable<Funcionario> {
    console.log(this.apiUrl);
    return this.http.post<Funcionario>(this.apiUrl, funcionario);
  }

  listarPage(
    page: number,
    size: number,
    sort: string
  ): Observable<Funcionario[]> {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString())
    .set('sort', sort)

    return this.http.get<Funcionario[]>(this.apiUrl, {params});
  }

  listarAll(): Observable<Response<Funcionario[]>> {
    return this.http.get<Response<Funcionario[]>>(this.apiUrl);
  }
}
