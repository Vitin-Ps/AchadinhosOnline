import {Carrinho, CarrinhoEnvio} from '../interfaces/Carrinho';
import {Response} from '../interfaces/Response';
import api from './api.';

export async function addItemCarrinho(carrinho: CarrinhoEnvio[]) {
  if (!carrinho) {
    return null;
  }

  console.log('chegou: ', carrinho);
  try {
    const res = await api.post('carrinho', carrinho);
    return res.data;
  } catch (error) {
    console.log('erro: ', error);
    return null;
  }
}

export async function listarItensCarrinhoPorFuncionarioId(
  id: number,
): Promise<Response<Carrinho[]> | null> {
  try {
    const res = await api.get(`carrinho/${id}`);
    return res.data;
  } catch (error) {
    console.log('erro: ', error);
    return null;
  }
}

export async function limparCarrinho(id: number) {
  try {
    const res = await api.delete(`carrinho/${id}`);
    return res.data;
  } catch (error) {
    console.log('erro: ', error);
    return null;
  }
}

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
