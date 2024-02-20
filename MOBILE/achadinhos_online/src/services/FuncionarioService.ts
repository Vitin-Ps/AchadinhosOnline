import {FileUpload} from '../interfaces/FileUpload';
import {Funcionario} from '../interfaces/Funcionario';
import {Response} from '../interfaces/Response';
import api from './api.';

export async function cadastrarFuncionario(
  funcionario: Funcionario,
  image: FileUpload,
) {
  if (!funcionario) {
    return null;
  }

  const formData = new FormData();

  if (image) formData.append('arquivo', image);

  delete funcionario.id;
  delete funcionario.imagem;

  const funcionarioJSON: string = JSON.stringify(funcionario);
  formData.append('dados', funcionarioJSON);

  try {
    const res = await api.post('funcionarios', formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
    return res.data;
  } catch (error) {
    console.log('erro: ', error);
    return null;
  }
}

export async function listarFuncionariosPage(
  page: number,
  pageSize: number,
  sort: string,
) {
  try {
    const res = await api.get(
      `funcionarios?page=${page}&size=${pageSize}&sort=${sort}`,
    );
    return res.data;
  } catch (error) {
    console.log('erro: ', error);
    return null;
  }
}

export async function listarFuncionariosAll(): Promise<Response<
  Funcionario[]
> | null> {
  try {
    const res = await api.get('funcionarios');
    return res.data;
  } catch (error) {
    console.log('erro: ', error);
    return null;
  }
}

export async function detalharFuncionario(id: number) {
  try {
    const res = await api.get(`funcionarios/${id}`);
    return res.data;
  } catch (error) {
    console.log('Error: ', error);
    return null;
  }
}

export async function deletarFuncionario(id: number) {
  try {
    const res = await api.delete(`funcionarios/${id}`);
    return res.data;
  } catch (error) {
    console.log('erro: ', error);
    return null;
  }
}

export async function alterarFuncionario(
  funcionario: Funcionario,
  image: FileUpload,
) {
  if (!funcionario) {
    return null;
  }

  const formData = new FormData();

  if (image) formData.append('arquivo', image);

  if (!funcionario.senha) delete funcionario.senha;
  delete funcionario.imagem;
  const produtoJSON: string = JSON.stringify(funcionario);

  formData.append('dados', produtoJSON);
  try {
    const res = await api.put('funcionarios', formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
    return res.data;
  } catch (error) {
    console.log('erro: ', error);
    return null;
  }
}
