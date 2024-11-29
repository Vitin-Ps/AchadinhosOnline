import { Produto } from './Produto';
import { Venda } from './Venda';

export interface Recibo {
  id?: number;
  produto: Produto;
  venda: Venda;
  quantidade: number;
  valorTotal: number
}
