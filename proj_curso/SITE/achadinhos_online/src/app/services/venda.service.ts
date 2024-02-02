import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { VendaDTO } from '../interfaces/VendaDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VendaService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}vendas`;
  constructor(private http: HttpClient) {}

  registrar(venda: VendaDTO): Observable<VendaDTO> {
    return this.http.post<VendaDTO>(this.apiUrl, venda);
  }
}
