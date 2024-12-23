import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { StatusLojinha, Venda, VendaDTO } from '../interfaces/Venda';
import { Response } from '../interfaces/Response';
import { Recibo } from '../interfaces/Recibo';

@Injectable({
  providedIn: 'root',
})
export class VendaService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}vendas`;

  constructor(private http: HttpClient) {}

  registrarVenda(venda: VendaDTO): Observable<VendaDTO> {
    return this.http.post<VendaDTO>(this.apiUrl, venda);
  }

  listarVendas(): Observable<Response<Venda[]>> {
    return this.http.get<Response<Venda[]>>(this.apiUrl);
  }

  listarRebicoPorVendaId(idVenda: number): Observable<Recibo[]> {
    return this.http.get<Recibo[]>(`${this.apiUrl}/recibo/${idVenda}`);
  }

  deleteItemRecibo(idItemRecibo: number): Observable<Recibo[]> {
    return this.http.delete<Recibo[]>(`${this.apiUrl}/recibo/${idItemRecibo}`);
  }

  detalharVenda(id: number): Observable<Venda> {
    return this.http.get<Venda>(`${this.apiUrl}/${id}/detalhar`);
  }

  alterarVenda(id: number, nomeCliente: string): Observable<Venda> {
    return this.http.put<Venda>(this.apiUrl, { id, nomeCliente });
  }

  excluirVenda(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  statusLojinha(): Observable<StatusLojinha> {
    return this.http.get<StatusLojinha>(`${this.apiUrl}/status`);
  }
}
