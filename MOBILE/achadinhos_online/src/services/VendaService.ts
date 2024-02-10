import {Carrinho, CarrinhoEnvio} from '../interfaces/Carrinho';
import {Response} from '../interfaces/Response';
import {VendaDTO} from '../interfaces/Venda';
import api from './api.';

export async function registraVenda(venda: VendaDTO) {
  if (!venda) {
    return null;
  }

  console.log('chegou: ', venda);
  try {
    const res = await api.post('vendas', venda);
    return res.data;
  } catch (error) {
    console.log('erro: ', error);
    return null;
  }
}

// export async function listarItensCarrinhoPorFuncionarioId(
//   id: number,
// ): Promise<Response<Carrinho[]> | null> {
//   try {
//     const res = await api.get(`carrinho/${id}`);
//     return res.data;
//   } catch (error) {
//     console.log('erro: ', error);
//     return null;
//   }
// }

// export async function listarProdutosPage(
//   page: number,
//   pageSize: number,
//   sort: string,
// ) {
//   try {
//     const res = await api.get(`produtos?page=${page}&size=${pageSize}&sort=${sort}`);
//     return res.data;
//   } catch (error) {
//     console.log('erro: ', error);
//     return null;
//   }
// }
