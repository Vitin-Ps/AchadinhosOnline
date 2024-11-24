import { Funcionario } from "./Funcionario";

export interface Venda {
    id?: number,
    funcionario: Funcionario,
    valorTotal: number,
    nomeCliente: string,
    comissao?: number
}

export interface VendaDTO  {
    id?: number,
    idFuncionario: number,
    valor: number
}

export interface StatusLojinha {
    funcionarios: number,
    produtos: number,
    vendas: number
}