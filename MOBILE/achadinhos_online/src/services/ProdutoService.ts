import {Produto, ProdutoDTO} from '../interfaces/Produto';
import api from './api.';

export async function cadastrarProduto(produto: Produto, image: File) {
  if (!produto) {
    return null;
  }

  const formData = new FormData();

  if (image) formData.append('arquivo', image);

  delete produto.id;
  delete produto.imagem;

  const produtoJSON: string = JSON.stringify(produto);
  formData.append('dados', produtoJSON);

  console.log("form", formData)

  // try {
  //   const res = await api.post('produtos', formData, { headers: { "Content-Type": "multipart/form-data" }});
  //   return res.data;
  // } catch (error) {
  //   console.log('erro: ', error);
  //   return null;
  // }
}
