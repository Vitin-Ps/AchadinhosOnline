import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Funcionario } from '../interfaces/Funcionario';
import { Observable } from 'rxjs';

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
}
