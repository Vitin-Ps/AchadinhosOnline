import { FileUpload } from '../interfaces/FileUpload';
import {Produto} from '../interfaces/Produto';
import { Response } from '../interfaces/Response';
import api from './api.';

export async function cadastrarProduto(produto: Produto, image: FileUpload) {
  if (!produto) {
    return null;
  }

  const formData = new FormData();
  console.log("image", image)

  if (image) formData.append('arquivo', image);

  delete produto.id;
  delete produto.imagem;

  const produtoJSON: string = JSON.stringify(produto);
  formData.append('dados', produtoJSON);

  console.log("form", formData)

  try {
    const res = await api.post('produtos', formData, { headers: { "Content-Type": "multipart/form-data" }});
    return res.data;
  } catch (error) {
    console.log('erro: ', error);
    return null;
  }
}

export async function listarProdutosPage(
  page: number,
  pageSize: number,
  sort: string,
) {
  try {
    const res = await api.get(`produtos?page=${page}&size=${pageSize}&sort=${sort}`);
    return res.data;
  } catch (error) {
    console.log('erro: ', error);
    return null;
  }
}

export async function listarProdutosAll(): Promise<Response<Produto[]> | null> {
  try {
    const res = await api.get('produtos');
    return res.data;
  } catch (error) {
    console.log('erro: ', error);
    return null;
  }
}

