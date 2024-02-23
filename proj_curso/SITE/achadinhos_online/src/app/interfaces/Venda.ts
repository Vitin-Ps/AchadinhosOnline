export interface VendaDTO {
  id?: number;
  idFuncionario: number;
  valor: number;
}

export interface StatusLojinha {
  funcionarios: number;
  produtos: number;
  vendas: number;
}
