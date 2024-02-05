import { Produto } from '../interfaces/Produto'
import api from './API'

export async function cadastrarProduto(produto: Produto) {
  if (!produto) {
    return null
  }

  const formData = new FormData()

  if (produto.imagem) formData.append('arquivo', produto.imagem!)
  console.log(produto.imagem)

  delete produto.imagem
  delete produto.id
  const produtoJSON: string = JSON.stringify(produto)
  formData.append('dados', produtoJSON)

  console.log('formdata', formData)
  try {
    const res = await api.get('/teste')
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log('erro: ', error)
    return null
  }
}
