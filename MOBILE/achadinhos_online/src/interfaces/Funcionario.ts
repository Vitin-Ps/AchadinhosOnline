export interface Funcionario {
  id?: number;
  nome: string;
  email: string;
  porcentagem: number;
  senha?: string;
  imagem?: string,
  selecionado?: boolean;
}
