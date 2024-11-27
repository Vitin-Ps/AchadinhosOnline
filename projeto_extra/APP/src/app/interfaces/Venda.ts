import { Funcionario } from './Funcionario';

export interface Venda {
  id?: number;
  funcionario: Funcionario;
  valorTotal: number;
  nomeCliente: string;
  comissaoTotal: number;
  dateCreated: string;
  dateUpdated?: string;
}

export interface VendaDTO {
  id?: number;
  funcionarioId: number;
  nomeCliente: string;
}

export interface StatusLojinha {
  funcionarios: number;
  produtos: number;
  vendas: number;
}
