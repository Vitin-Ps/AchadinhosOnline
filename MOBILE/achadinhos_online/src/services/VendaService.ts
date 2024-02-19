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

export async function listarVendasAll() {
  try {
    const res = await api.get('vendas');
    return res.data;
  } catch (error) {
    console.log('erro: ', error);
    return null;
  }
}

export async function statusLojinha() {
  try {
    const res = await api.get('vendas/status');
    return res.data;
  } catch (error) {
    console.log('erro: ', error);
    return null;
  }
} 

export async function listarComissoes() {
  try {
    const res = await api.get(`vendas/comissao`);
    return res.data;
  } catch (error) {
    console.log('erro: ', error);
    return null;
  }
}

export async function deletarVenda(id: number) {
  try {
    const res = await api.delete(`vendas/${id}`);
    return res.data;
  } catch (error) {
    console.log('erro: ', error);
    return null;
  }
}
