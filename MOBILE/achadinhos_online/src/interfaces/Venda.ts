import { Funcionario } from "./Funcionario";

export interface Venda {
    id?: number,
    funcionario: Funcionario,
    venda: number,
    comissao?: number
    selecionado?: boolean;
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